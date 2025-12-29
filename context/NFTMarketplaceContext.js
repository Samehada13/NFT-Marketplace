import React, { useState, useContext, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers, BigNumber } from 'ethers';
import Router from 'next/router';
import { useRouter } from 'next/router';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants';

// Polygon Amoy Testnet Chain ID
const POLYGON_AMOY_CHAIN_ID = 80002;

const fetchContract = (signerOrProvider) => new ethers.Contract(NFTMarketplaceAddress,
    NFTMarketplaceABI, signerOrProvider);

// Helper function to check if user is on correct network
const checkNetwork = async () => {
    if (!window.ethereum) return { isCorrect: false, chainId: null };

    try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const chainIdDecimal = parseInt(chainId, 16);
        return {
            isCorrect: chainIdDecimal === POLYGON_AMOY_CHAIN_ID,
            chainId: chainIdDecimal
        };
    } catch (error) {
        console.error("Error checking network:", error);
        return { isCorrect: false, chainId: null };
    }
};

// Helper function to switch to Polygon Amoy
const switchToPolygonAmoy = async () => {
    if (!window.ethereum) {
        throw new Error("MetaMask not installed");
    }

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${POLYGON_AMOY_CHAIN_ID.toString(16)}` }],
        });
        return true;
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: `0x${POLYGON_AMOY_CHAIN_ID.toString(16)}`,
                        chainName: 'Polygon Amoy Testnet',
                        nativeCurrency: {
                            name: 'MATIC',
                            symbol: 'MATIC',
                            decimals: 18
                        },
                        rpcUrls: ['https://rpc-amoy.polygon.technology/'],
                        blockExplorerUrls: ['https://amoy.polygonscan.com/']
                    }]
                });
                return true;
            } catch (addError) {
                console.error("Error adding network:", addError);
                throw addError;
            }
        }
        throw switchError;
    }
};

const connectingWithSC = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong while connecting with smart contract");
    }
}

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Discover, collect, and sell NFTs";
    const [toasts, setToasts] = useState([]);
    const [currentAccount, setCurrentAccount] = useState("");
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(true);
    const [currentChainId, setCurrentChainId] = useState(null);
    const router = useRouter();
    const { BigNumber } = ethers;

    // Toast management functions
    const addToast = (message, type = 'error', duration = 5000) => {
        // Prevent duplicate toasts with the same message
        setToasts(prev => {
            const isDuplicate = prev.some(toast => toast.message === message);
            if (isDuplicate) {
                console.log("Toast duplicate prevented:", message);
                return prev;
            }
            const id = Date.now() + Math.random();
            return [...prev, { id, message, type, duration }];
        });
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    // Network checking function
    const validateNetwork = async () => {
        const { isCorrect, chainId } = await checkNetwork();
        setIsCorrectNetwork(isCorrect);
        setCurrentChainId(chainId);
        return isCorrect;
    };

    // Listen for network changes
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {
                validateNetwork();
            });
        }
        validateNetwork();
    }, []);

    // Function to switch network with user feedback
    const requestNetworkSwitch = async () => {
        try {
            await switchToPolygonAmoy();
            addToast("Successfully switched to Polygon Amoy Testnet!", "success", 3000);
            await validateNetwork();
            return true;
        } catch (error) {
            addToast("Failed to switch network. Please switch manually in MetaMask.", "error", 5000);
            console.error("Network switch error:", error);
            return false;
        }
    };


    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) {
                // Use toast instead of blocking modal - app works with sample data
                addToast("MetaMask not detected. Install MetaMask to connect your wallet.", "warning", 8000);
                return;
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                addToast("No account found. Please connect your wallet.", "info", 5000);
            }
        } catch (error) {
            addToast("Unable to connect to wallet. Using sample data.", "warning", 5000);
            console.log("Wallet connection error:", error);
        }
    }

    // Removed automatic wallet check - users can manually connect when needed
    // useEffect(() => {
    //     checkIfWalletConnected();
    // }, []);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                addToast("Install MetaMask to connect your wallet", "warning", 8000);
                return;
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            setCurrentAccount(accounts[0]);
            addToast("Wallet connected successfully!", "success", 3000);
            // window.location.reload();
        } catch (error) {
            addToast("Error while connecting to wallet", "error", 5000);
            console.log("Connect wallet error:", error);
        }
    }

    const uploadIPFS = async (file) => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `82c12d79b690ca73ad17`,
                        pinata_secret_api_key: `f6d62dfb965aea5a9d12e99ac6430187400b4e0d84e0d7670f31970af1018853`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
                console.log("Successfully uploaded");

                return ImgHash;
            } catch (error) {
                console.log("Unable to upload image to pinata", error.message);
            }
        }
    }

    const createNFT = async (
        name,
        price,
        image,
        description,
        website,
        category,
        royalties,
        fileSize,
        properties,
        router
    ) => {
        // Check if wallet is connected first
        if (!currentAccount) {
            addToast("Please connect your wallet before creating an NFT", "warning", 5000);
            return;
        }

        if (
            !name ||
            !description ||
            !price ||
            !image ||
            !category ||
            !royalties ||
            !fileSize ||
            !properties
        ) {
            addToast("Please fill in all required fields", "error", 5000);
            return;
        }

        const currentDate = new Date();
        const currentDateTime = currentDate.toISOString();
        const creatorAddress = currentAccount;

        const data = JSON.stringify({
            name,
            image,
            description,
            website,
            category,
            royalties,
            fileSize,
            properties,
            timestamp: currentDateTime,
            creatorAddress
        });

        try {
            const response = await axios({
                method: "POST",
                url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                data: data,
                headers: {
                    pinata_api_key: `82c12d79b690ca73ad17`,
                    pinata_secret_api_key: `f6d62dfb965aea5a9d12e99ac6430187400b4e0d84e0d7670f31970af1018853`,
                    "Content-Type": "application/json",
                },
            });

            const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            console.log(url);

            await createSale(url, price);
            router.push("/searchPage");
        } catch (error) {
            addToast("Error while creating NFT. Please try again.", "error", 5000);
            console.error("Create NFT error:", error);
        }
        console.log(data);
    }

    const createSale = async (url, formInputPrice, isReselling, id) => {
        console.log("🔵 createSale called - Starting network validation...");
        try {
            // Validate network first
            const isOnCorrectNetwork = await validateNetwork();
            console.log("🔵 Network validation result:", { isOnCorrectNetwork, currentChainId });

            if (!isOnCorrectNetwork) {
                console.warn("⚠️ Wrong network detected! Chain ID:", currentChainId);
                addToast(
                    `Please switch to Polygon Amoy Testnet. Current network: Chain ID ${currentChainId || 'Unknown'}`,
                    "error",
                    8000
                );

                // Attempt to switch network automatically
                console.log("🔄 Attempting automatic network switch...");
                const switched = await requestNetworkSwitch();
                console.log("🔄 Network switch result:", switched);

                if (!switched) {
                    console.error("❌ Network switch failed or was rejected");
                    throw new Error("Network switch required");
                }
                console.log("✅ Network switched successfully!");
            } else {
                console.log("✅ Already on correct network - proceeding...");
            }

            console.log("💰 Parsing price...");
            const price = ethers.utils.parseUnits(formInputPrice, "ether");

            console.log("🔗 Connecting to smart contract...");
            const contract = await connectingWithSC();

            console.log("📋 Getting listing price from contract...");
            const listingPrice = await contract.getListingPrice();
            console.log("📋 Listing price:", ethers.utils.formatEther(listingPrice), "MATIC");

            console.log("📝 Creating transaction...");
            const transaction = !isReselling
                ? await contract.createToken(url, price, { value: listingPrice.toString() })
                : await contract.resellToken(id, price, { value: listingPrice.toString() });

            console.log("⏳ Waiting for transaction confirmation...");
            await transaction.wait();

            console.log("✅ Transaction successful!", transaction);

        } catch (error) {
            console.error("❌ ERROR in createSale:", error);

            // More specific error handling
            if (error.code === 'CALL_EXCEPTION') {
                console.error("❌ CALL_EXCEPTION - Contract call failed");
                addToast("Contract call failed. Please ensure you're on Polygon Amoy Testnet.", "error", 6000);
            } else if (error.message?.includes("user rejected")) {
                console.log("ℹ️ User rejected transaction");
                addToast("Transaction cancelled by user.", "info", 4000);
            } else if (error.message?.includes("Network switch required")) {
                console.log("ℹ️ Network switch was required but not completed");
                // Already handled above
            } else {
                console.error("❌ Unknown error:", error.message);
                addToast("Error while creating sale. Please try again.", "error", 5000);
            }
            console.error("Full error details:", error);
            throw error; // Re-throw so createNFT can handle it
        }
    };

    const fetchNFTs = async () => {
        try {
            // if (currentAccount){
            // const web3Model = new Web3Modal();
            // const connection = await web3Model.connect();
            // const provider = new ethers.providers.Web3Provider(connection);

            const provider = new ethers.providers.JsonRpcProvider(
                "https://polygon-amoy.g.alchemy.com/v2/XoIZdP9gtMdVqFNrsjfst5esSDnOg-US"
            );

            console.log(provider);
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItems();
            // console.log('Data heree', data);

            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);

                    const {
                        data: {
                            image,
                            name,
                            description,
                            website,
                            category,
                            royalties,
                            fileSize,
                            properties,
                            timestamp,
                            creatorAddress
                        },
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );
                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        website,
                        category,
                        royalties,
                        fileSize,
                        properties,
                        timestamp,
                        creator: creatorAddress,
                        tokenURI
                    };
                })
            );
            return items;
            // } 

        } catch (error) {
            // Use toast for non-critical errors since we have fallback data
            addToast("Unable to fetch NFTs from blockchain. Using sample data.", "warning", 6000);
            console.log(error);
        }
    };



    const fetchMyNFTsOrListedNFTs = async (type) => {
        try {
            // if(currentAccount){
            const contract = await connectingWithSC();

            const data = type == "fetchItemsListed" ? await contract.fetchItemsListed() :
                await contract.fetchMyNFTs();

            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: { image, name, description, website, category, royalties,
                            fileSize, properties, timestamp, creatorAddress },
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );
                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        website,
                        category,
                        royalties,
                        fileSize,
                        properties,
                        timestamp,
                        creator: creatorAddress,
                        tokenURI
                    }
                })
            )
            return items;
            // }


        } catch (error) {
            // Use toast for non-critical errors - this function is for user's own NFTs
            addToast("Unable to fetch your NFTs from blockchain.", "info", 5000);
            console.log("Error fetching listed NFTs:", error);
        }
    }



    const fetchNFTsByAddressFromURL = async () => {
        try {
            const contract = await connectingWithSC();

            const urlParams = new URLSearchParams(window.location.search);
            const userAddress = urlParams.get('address');

            const allNfts = await contract.fetchMarketItems();

            if (userAddress) {
                const userNfts = allNfts.filter(item => item.seller.toLowerCase() === userAddress.toLowerCase());

                const items = await Promise.all(
                    userNfts.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                        try {
                            const tokenURI = await contract.tokenURI(tokenId);

                            let additionalData = {};
                            if (tokenURI) {
                                const {
                                    data: { image, name, description, website, category,
                                        royalties, fileSize, properties, timestamp, creatorAddress },
                                } = await axios.get(tokenURI);

                                additionalData = {
                                    image,
                                    name,
                                    description,
                                    website,
                                    category,
                                    royalties,
                                    fileSize,
                                    properties,
                                    timestamp,
                                    creator: creatorAddress,
                                };
                            } else {
                                // Handle the case where tokenURI is undefined
                                console.log('TokenURI is undefined for tokenId:', tokenId);
                            }

                            const formattedPrice = ethers.utils.formatUnits(
                                unformattedPrice.toString(),
                                "ether"
                            );

                            return {
                                price: formattedPrice,
                                tokenId: tokenId.toNumber(),
                                seller,
                                owner,
                                tokenURI,
                                ...additionalData,
                            };
                        } catch (error) {
                            console.error('Error processing token data:', error);
                            throw error;
                        }
                    })
                );

                console.log(items);
                return items;
            } else {
                console.log('No address found in the URL');
                return [];
            }
        } catch (error) {
            addToast("Error while fetching NFTs. Please try again.", "error", 5000);
            console.error("Fetch NFTs by address error:", error);
            return [];
        }
    };

    const buyNFT = async (nft) => {
        console.log("buyNFT function called");
        try {
            // Check if wallet is connected first
            if (!currentAccount) {
                addToast("Please connect your wallet before buying an NFT", "warning", 5000);
                throw new Error("Wallet not connected");
            }

            // Validate network
            const isOnCorrectNetwork = await validateNetwork();
            if (!isOnCorrectNetwork) {
                addToast(
                    `Please switch to Polygon Amoy Testnet. Current network: Chain ID ${currentChainId || 'Unknown'}`,
                    "error",
                    8000
                );
                const switched = await requestNetworkSwitch();
                if (!switched) {
                    throw new Error("Network switch required");
                }
            }

            const contract = await connectingWithSC();
            if (!contract) {
                addToast("Failed to connect to smart contract. Please try again.", "error", 5000);
                throw new Error("Contract connection failed");
            }

            const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            });
            await transaction.wait();
            addToast("NFT purchased successfully!", "success", 5000);
            router.push("/author");
        } catch (error) {
            console.error("Error while buying NFT:", error);

            // More specific error handling
            if (error.message?.includes("user rejected")) {
                addToast("Transaction cancelled by user.", "info", 4000);
            } else if (error.message?.includes("insufficient funds")) {
                addToast("Insufficient funds to complete the purchase.", "error", 5000);
            } else if (error.message?.includes("Wallet not connected") || error.message?.includes("Network switch required")) {
                // Already handled above
            } else {
                addToast("Error while buying NFT. Please try again.", "error", 5000);
            }
            throw error;
        }
    }

    const placeBid = async (tokenId, bidAmount) => {
        try {
            if (tokenId === undefined || bidAmount === undefined) {
                throw new Error("tokenId and bidAmount must be defined.");
            }

            console.log("Calling placeBid with tokenId:", tokenId, "bidAmount:", bidAmount);

            const contract = await connectingWithSC();
            console.log("Connected to contract:", contract);

            // Format bidAmount as ether before passing it to the contract method
            const formattedBidAmount = ethers.utils.parseUnits(bidAmount.toString(), "ether");

            const transaction = await contract.placeBid(tokenId, {
                value: formattedBidAmount,
            });

            // Log the transaction hash
            console.log("Transaction hash:", transaction.hash);

            await transaction.wait();

            // Log success message
            console.log("Bid placed successfully!");

            const bidsForNFT = await fetchBidsForNFT(tokenId);
            console.log("Bids for NFT after successful bid:", bidsForNFT);
        } catch (error) {
            console.error("Error placing bid", error);
            console.error("Error details:", error.message, error.code, error.data);
            addToast("Error placing bid. Please try again.", "error", 5000);
        }
    };

    const fetchBidsForNFT = async (tokenId) => {
        try {
            const contract = await connectingWithSC();

            // Call the getTop7BidsForNFT function from the smart contract
            const top7Bids = await contract.getTop7BidsForNFT(tokenId);

            // Check if there are top 7 bids
            if (!top7Bids || top7Bids.length === 0) {
                console.log('No top 7 bids found for the specified NFT');
                return [];
            }

            // Format the top 7 bids
            const formattedTop7Bids = top7Bids.map((bid) => ({
                bidId: bid.bidId.toNumber(),
                tokenId: bid.tokenId.toNumber(),
                bidder: bid.bidder,
                amount: ethers.utils.formatUnits(bid.amount.toString(), 'ether'),
                active: bid.active,
            }));

            console.log('Fetched top 7 bids in fetchTop7BidsForNFT:', formattedTop7Bids);

            return formattedTop7Bids;
        } catch (error) {
            console.error('Error fetching top 7 bids for NFT', error);
            addToast('Error fetching bids for NFT', "error", 5000);
            return [];
        }
    };

    const acceptBid = async (bidId) => {
        try {
            const contract = await connectingWithSC();
            const transaction = await contract.acceptBid(bidId);
            const receipt = await transaction.wait();

            if (receipt.status === 1) {
                console.log("Bid accepted successfully!");

                try {
                    router.push("/searchPage");
                } catch (error) {
                    console.error("Error navigating to search page", error);
                    addToast("Error navigating to search page", "error", 5000);
                    return;
                }

            } else {
                console.error("Transaction failed:", receipt);
                addToast("Error accepting bid. Transaction failed.", "error", 5000);
            }
        } catch (error) {
            console.error("Error accepting bid", error);
            console.error("Error details:", error.message, error.code, error.data);
            addToast("Error accepting bid. Please try again.", "error", 5000);
        }
    };

    const leaveSellerReview = async (sellerAddress, reviewText) => {
        try {
            // Connect to the smart contract
            const contract = await connectingWithSC();
            console.log("Connected to smart contract:", contract);

            // Call the addSellerReview function from the smart contract
            console.log("Calling addSellerReview function with parameters:", sellerAddress, reviewText);
            const transaction = await contract.addSellerReview(sellerAddress, reviewText);
            console.log("Transaction:", transaction); // Log the transaction object

            // Wait for the transaction to be mined
            console.log("Waiting for transaction to be mined...");
            await transaction.wait();

            // Log success message
            console.log("Seller review added successfully!");

            // Return true to indicate success
            return true;
        } catch (error) {
            // Log any unexpected errors
            console.error("Error adding seller review", error);

            // Log additional error details
            console.error("Error details:", error.message, error.code, error.data);

            // Return false to indicate failure
            return false;
        }
    };

    const fetchReviewsForAddress = async (sellerAddress) => {
        try {
            // Connect to the smart contract
            const contract = await connectingWithSC();
            console.log("Connected to smart contract:", contract);

            // Call the fetchReviewsForAddress function from the smart contract
            console.log("Calling fetchReviewsForAddress function with parameter:", sellerAddress);
            const reviews = await contract.fetchReviewsForAddress(sellerAddress);
            console.log("Reviews for address", sellerAddress, ":", reviews); // Log the reviews

            // Return the reviews
            return reviews;
        } catch (error) {
            // Log any unexpected errors
            console.error("Error fetching reviews for address", sellerAddress, error);

            // Log additional error details
            console.error("Error details:", error.message, error.code, error.data);

            // Return an empty array to indicate failure
            return [];
        }
    };

    const fetchNFTsWithBids = async () => {
        try {
            const contract = await connectingWithSC();  // Get connected contract instance
            const marketItems = await contract.fetchMarketItems();  // Fetch all market items

            const itemsWithBids = await Promise.all(marketItems.map(async (item) => {
                const bids = await contract.getTop7BidsForNFT(item.tokenId);  // Fetch top 7 bids for each item
                const activeBids = bids.filter(bid => bid.active).map(bid => ({
                    ...bid,
                    amount: ethers.utils.formatEther(bid.amount)  // Format bid amount from BigNumber
                }));

                const tokenUri = await contract.tokenURI(item.tokenId); // Fetch the token URI
                const metadataResponse = await fetch(tokenUri); // Fetch the metadata JSON file
                const metadata = await metadataResponse.json(); // Parse the JSON

                // Extract and include extended metadata details in the return object
                const additionalData = {
                    image: metadata.image,  // Assuming metadata includes 'image'
                    name: metadata.name,  // Assuming metadata includes 'name'
                    description: metadata.description,  // Assuming metadata includes 'description'
                    website: metadata.website,  // Assuming metadata includes 'website'
                    category: metadata.category,  // Assuming metadata includes 'category'
                    royalties: metadata.royalties,  // Assuming metadata includes 'royalties'
                    fileSize: metadata.fileSize,  // Assuming metadata includes 'fileSize'
                    properties: metadata.properties,  // Assuming metadata includes 'properties'
                    timestamp: metadata.timestamp,  // Assuming metadata includes 'timestamp'
                };

                return {
                    tokenId: item.tokenId.toString(),  // Convert tokenId to string if needed
                    price: ethers.utils.formatEther(item.price),  // Convert price from BigNumber
                    currentBidder: activeBids.length > 0 ? activeBids[0].bidder : "No active bids",  // Use the first active bid to define the current highest bidder
                    owner: item.owner,
                    seller: item.seller,
                    sold: item.sold,
                    ...additionalData
                };
            }));

            const itemsWithActiveBids = itemsWithBids.filter(item => item.currentBidder !== "No active bids");

            console.log("NFTs with active bids:", itemsWithActiveBids);
            return itemsWithActiveBids;
        } catch (error) {
            console.error('Failed to fetch NFTs with active bids:', error);
            return [];
        }
    };

    return (
        <NFTMarketplaceContext.Provider value={{
            titleData,
            connectWallet,
            uploadIPFS,
            createNFT,
            fetchMyNFTsOrListedNFTs,
            fetchNFTsByAddressFromURL,
            buyNFT,
            checkIfWalletConnected,
            fetchNFTs,
            createSale,
            currentAccount,
            placeBid,
            acceptBid,
            fetchBidsForNFT,
            leaveSellerReview,
            fetchReviewsForAddress,
            fetchNFTsWithBids,
            toasts,
            addToast,
            removeToast,
            // Network-related exports
            isCorrectNetwork,
            currentChainId,
            validateNetwork,
            requestNetworkSwitch,
        }}>
            {children}
        </NFTMarketplaceContext.Provider>
    );
};
