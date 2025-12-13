import React, { useContext } from 'react';
import { NFTMarketplaceContext } from '../../context/NFTMarketplaceContext';

const NetworkSwitch = () => {
    const { isCorrectNetwork, currentChainId, requestNetworkSwitch } = useContext(NFTMarketplaceContext);

    // Don't show anything if on correct network
    if (isCorrectNetwork) {
        return null;
    }

    const getNetworkName = (chainId) => {
        const networks = {
            1: 'Ethereum Mainnet',
            5: 'Goerli Testnet',
            11155111: 'Sepolia Testnet',
            137: 'Polygon Mainnet',
            80001: 'Mumbai Testnet',
            80002: 'Polygon Amoy Testnet',
        };
        return networks[chainId] || `Chain ID: ${chainId}`;
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                        <svg
                            className="w-6 h-6 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <div>
                            <p className="font-semibold text-sm md:text-base">
                                Wrong Network Detected
                            </p>
                            <p className="text-xs md:text-sm opacity-90">
                                You're connected to <span className="font-medium">{getNetworkName(currentChainId)}</span>.
                                This app requires <span className="font-medium">Polygon Amoy Testnet</span>.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={requestNetworkSwitch}
                        className="px-6 py-2 bg-white text-red-600 rounded-lg font-semibold 
                                 hover:bg-gray-100 transition-all duration-200 shadow-md 
                                 hover:shadow-lg transform hover:scale-105 text-sm md:text-base
                                 whitespace-nowrap"
                    >
                        Switch to Amoy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NetworkSwitch;
