require("@nomicfoundation/hardhat-toolbox");

const RPC_URL = "https://polygon-amoy.g.alchemy.com/v2/XoIZdP9gtMdVqFNrsjfst5esSDnOg-US";
const PRIVATE_KEY = "8e3c412d4df3297d37480f91021b89478ec00ffe0e4285c9abe6437a487960fb";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.17",
  // defaultNetwork: "polygon_mumbai",
  // networks: {
  //   hardhat: {},
  //   polygon_mumbai: {
  //     url: RPC_URL,
  //     accounts: [`0x${PRIVATE_KEY}`],
  //   },
  // },
  defaultNetwork: "polygon_amoy",
  networks: {
    hardhat: {
      chainId: 80002,
    },
    polygon_amoy: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
    solidity: {
      version: "0.8.17",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        }
      }
    }
};
