const { ethers } = require("hardhat");

// Import the ABI directly from the JSON file
const NFTMarketplace = require("../context/NFTMarketplace.json");
const NFTMarketplaceABI = NFTMarketplace.abi;
const NFTMarketplaceAddress = "0xFab46273936c613e8C1A0ddA75f82dCB1d154c9B";

async function main() {
    console.log("\n🔍 Verifying NFT Marketplace Contract...\n");
    console.log("📍 Contract Address:", NFTMarketplaceAddress);

    try {
        // Get the provider from hardhat config
        const provider = new ethers.providers.JsonRpcProvider(
            "https://polygon-amoy.g.alchemy.com/v2/XoIZdP9gtMdVqFNrsjfst5esSDnOg-US"
        );

        console.log("\n🌐 Connected to Polygon Amoy Testnet");

        // Check if code exists at the address
        const code = await provider.getCode(NFTMarketplaceAddress);

        if (code === "0x") {
            console.log("\n❌ ERROR: No contract found at this address!");
            console.log("This means the contract is NOT deployed at:", NFTMarketplaceAddress);
            console.log("\n💡 Solution: You need to redeploy the contract using:");
            console.log("   npx hardhat run scripts/deploy.js --network polygon_amoy");
            return;
        }

        console.log("✅ Contract code exists at this address");

        // Try to create a contract instance
        const contract = new ethers.Contract(
            NFTMarketplaceAddress,
            NFTMarketplaceABI,
            provider
        );

        console.log("\n📋 Testing contract functions...");

        // Test getListingPrice function
        try {
            const listingPrice = await contract.getListingPrice();
            console.log("✅ getListingPrice() works!");
            console.log("   Listing Price:", ethers.utils.formatEther(listingPrice), "ETH");
        } catch (error) {
            console.log("❌ getListingPrice() failed:", error.message);
        }

        // Test owner
        try {
            const owner = await contract.owner();
            console.log("✅ owner() works!");
            console.log("   Owner Address:", owner);
        } catch (error) {
            console.log("❌ owner() failed:", error.message);
        }

        // Test fetchMarketItems
        try {
            const items = await contract.fetchMarketItems();
            console.log("✅ fetchMarketItems() works!");
            console.log("   Market Items Count:", items.length);
        } catch (error) {
            console.log("❌ fetchMarketItems() failed:", error.message);
        }

        console.log("\n✨ Contract verification complete!");

    } catch (error) {
        console.error("\n❌ Error during verification:", error.message);
        console.log("\n💡 Possible issues:");
        console.log("   1. Wrong network - Make sure MetaMask is on Polygon Amoy Testnet");
        console.log("   2. Contract not deployed - Run deployment script");
        console.log("   3. Wrong contract address in constants.js");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
