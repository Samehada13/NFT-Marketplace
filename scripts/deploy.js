const hre = require("hardhat");

async function main() {
  // Deploy NFTMarketplace
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const NFTMarketplaceAddress = await NFTMarketplace.deploy();
  await NFTMarketplaceAddress.deployed();
  console.log(`NFTMarketplace address ${NFTMarketplaceAddress.address}`);

  // Deploy NFTBidding
  // const NFTBidding = await hre.ethers.getContractFactory("NFTBidding");
  // const NFTBiddingAddress = await NFTBidding.deploy("NFTBiddingName", "NFTB", NFTMarketplaceAddress.address);
  // await NFTBiddingAddress.deployed();
  // console.log(`NFTBidding address ${NFTBiddingAddress.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
