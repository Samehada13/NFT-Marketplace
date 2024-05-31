// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private _bidIds;

    uint256 public listingPrice = 0.025 ether;
    address payable public owner;

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => Bid) private idToBid;
    mapping(address => string[]) private sellerReviews;



    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        address bidder;
        uint256 price;
        bool sold;
        uint256 timestamp;
    }

    struct Bid {
        uint256 bidId;
        uint256 tokenId;
        address payable bidder;
        uint256 amount;
        bool active;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold,
        uint256 timestamp
    );

    event BidPlaced(
        uint256 indexed bidId,
        uint256 indexed tokenId,
        address bidder,
        uint256 amount
    );

    event BidAccepted(
        uint256 indexed bidId,
        uint256 indexed tokenId,
        address indexed seller,
        address bidder,
        uint256 amount
    );

    event ReviewAdded(
        address indexed seller, 
        string review
    );

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    function placeBid(uint256 tokenId) public payable {
        require(msg.value > 0, "Bid amount must be greater than 0");

        uint256 bidId = _bidIds.current() + 1;
        idToBid[bidId] = Bid(bidId, tokenId, payable(msg.sender), msg.value, true);
        _bidIds.increment();

        emit BidPlaced(bidId, tokenId, msg.sender, msg.value);
    }

    function getTop7BidsForNFT(uint256 tokenId) external view returns (Bid[] memory) {
        uint256 bidCount = _bidIds.current();
        uint256 nftBidCount = 0;

        // Count all bids for the given tokenId
        for (uint256 i = 1; i <= bidCount; i++) {
            if (idToBid[i].tokenId == tokenId) {
                nftBidCount += 1;
            }
        }

        // If there are no bids, return an empty array of Bids
        if (nftBidCount == 0) {
            return new Bid[](0);  // Proper syntax for returning an empty array
        }

        // Otherwise, collect all bids into an array
        Bid[] memory allBids = new Bid[](nftBidCount);
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= bidCount; i++) {
            if (idToBid[i].tokenId == tokenId) {
                allBids[currentIndex] = idToBid[i];
                currentIndex += 1;
            }
        }

        // Sort the bids if there are more than one
        if (allBids.length > 1) {
            quickSort(allBids, int(0), int(allBids.length - 1));
        }

        // Return up to 7 of the highest bids
        uint256 top7Count = (nftBidCount < 7) ? nftBidCount : 7;
        Bid[] memory top7Bids = new Bid[](top7Count);
        for (uint256 i = 0; i < top7Count; i++) {
            top7Bids[i] = allBids[i];
        }

        return top7Bids;
    }

    function quickSort(Bid[] memory arr, int left, int right) internal pure {
        int i = left;
        int j = right;
        if (i == j) return;
        uint pivot = arr[uint(left + (right - left) / 2)].amount;
        while (i <= j) {
            while (arr[uint(i)].amount > pivot) i++;
            while (pivot > arr[uint(j)].amount) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                i++;
                j--;
            }
        }
        if (left < j) quickSort(arr, left, j);
        if (i < right) quickSort(arr, i, right);
    }

    function acceptBid(uint256 bidId) public {
        Bid storage bid = idToBid[bidId];
        require(bid.active, "Bid is not active");
        require(msg.sender == idToMarketItem[bid.tokenId].seller, "Only item owner can accept bids");

        // Transfer the token associated with the accepted bid to the bidder
        _transfer(idToMarketItem[bid.tokenId].owner, bid.bidder, bid.tokenId);

        idToMarketItem[bid.tokenId].owner = bid.bidder;
        idToMarketItem[bid.tokenId].seller = payable(address(0));
        idToMarketItem[bid.tokenId].sold = true;

        _itemsSold.increment();

        emit BidAccepted(bidId, bid.tokenId, msg.sender, bid.bidder, bid.amount);

        // Transfer the listing price to the marketplace owner
        payable(owner).transfer(listingPrice);
        // Transfer the bid amount to the seller
        payable(msg.sender).transfer(bid.amount);

        // Deactivate the bid
        bid.active = false;

        // Transfer back all other bids for the same token to their respective bidders
        deleteAndReturnOtherBids(bid.tokenId, bidId);

        // Delete all bids for the token
        deleteAllBidsForNFT(bid.tokenId);
    }

    function deleteAndReturnOtherBids(uint256 tokenId, uint256 acceptedBidId) internal {
        uint256 bidCount = _bidIds.current();

        for (uint256 i = 1; i <= bidCount; i++) {
            if (idToBid[i].active && i != acceptedBidId && idToBid[i].tokenId == tokenId) {
                Bid storage otherBid = idToBid[i];
                otherBid.active = false; // Deactivate the other bid
                payable(otherBid.bidder).transfer(otherBid.amount); // Return the bid amount to the bidder
                delete idToBid[i]; // Delete the other bid
            }
        }
    }

    function deleteAllBidsForNFT(uint256 tokenId) internal {
        uint256 bidCount = _bidIds.current();

        for (uint256 i = 1; i <= bidCount; i++) {
            if (idToBid[i].tokenId == tokenId) {
                delete idToBid[i];
            }
        }
    }

    function updateListingPrice(uint256 _listingPrice) public payable {
        require(owner == msg.sender, "Only marketplace owner can update listing price.");
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            address(0),
            price,
            false,
            block.timestamp
        );

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(tokenId, msg.sender, address(this), price, false, block.timestamp);
    }

    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();
        _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        deleteAllBidsForNFT(tokenId);

        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        address payable seller = idToMarketItem[tokenId].seller;
        idToMarketItem[tokenId].seller = payable(address(0));
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);

        seller.transfer(price);
        payable(owner).transfer(listingPrice);
    }

    function addSellerReview(address seller, string memory review) public {
        require(bytes(review).length > 0, "Review cannot be empty");
        sellerReviews[seller].push(review);
        emit ReviewAdded(seller, review);
    }

    function getSellerReviews(address seller) public view returns (string[] memory) {
        return sellerReviews[seller];
    }

    function fetchReviewsForAddress(address _address) public view returns (string[] memory) {
        return sellerReviews[_address];
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                items[currentIndex] = idToMarketItem[currentId];
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                items[currentIndex] = idToMarketItem[currentId];
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                items[currentIndex] = idToMarketItem[currentId];
                currentIndex += 1;
            }
        }
        return items;
    }

}

