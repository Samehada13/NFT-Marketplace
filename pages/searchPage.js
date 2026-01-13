import { useState, useEffect, useContext } from 'react';
import Style from '../styles/searchPage.module.css';
import {
    Brand,
    Loader,
    BTC,
    Title,
    Category,
    AreaChart,
} from '../components/componentIndex';
import { Filter } from '../components/componentIndex';
import { NFTCardTwo, Banner } from '../collectionPage/collectionIndex';
import { useTranslation } from 'react-i18next';
import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';
import { generateSampleNFTs } from '../utils/sampleData';

const searchPage = () => {
    const { fetchNFTs, currentAccount } = useContext(NFTMarketplaceContext);
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await fetchNFTs();

                // Generate sample data with offset tokenIds to avoid key collisions
                const sampleData = generateSampleNFTs(15);
                const formattedSampleData = sampleData.map((nft, idx) => ({
                    ...nft,
                    tokenId: nft.tokenId + 1000, // Offset to avoid collision with real NFTs
                    price: (parseFloat(nft.price) / 1e18).toFixed(4),
                }));

                if (items && Array.isArray(items) && items.length > 0) {
                    const now = new Date();
                    const itemsWithTimestamps = items.map((nft, index) => ({
                        ...nft,
                        timestamp:
                            nft.timestamp ||
                            Math.floor(
                                (now.getTime() - index * 86400000) / 1000
                            ), // Spread over last N days
                    }));
                    const reversedItems = itemsWithTimestamps.slice().reverse();

                    const allNFTs = [
                        ...reversedItems,
                        ...formattedSampleData,
                    ].sort((a, b) => {
                        // Convert to Date for proper comparison (handles ISO strings and Unix timestamps)
                        const dateA = a.timestamp
                            ? new Date(
                                  typeof a.timestamp === 'number' &&
                                  a.timestamp < 1e12
                                      ? a.timestamp * 1000
                                      : a.timestamp
                              )
                            : new Date(0);
                        const dateB = b.timestamp
                            ? new Date(
                                  typeof b.timestamp === 'number' &&
                                  b.timestamp < 1e12
                                      ? b.timestamp * 1000
                                      : b.timestamp
                              )
                            : new Date(0);
                        return dateB - dateA; // Newest first
                    });
                    setNfts(allNFTs);
                    setNftsCopy(allNFTs);
                } else {
                    // No real NFTs, use sample data only
                    setNfts(formattedSampleData);
                    setNftsCopy(formattedSampleData);
                }
            } catch (error) {
                console.log(
                    'Error while fetching NFTs, using sample data:',
                    error
                );
                const sampleData = generateSampleNFTs(15);
                const formattedSampleData = sampleData.map((nft) => ({
                    ...nft,
                    price: (parseFloat(nft.price) / 1e18).toFixed(4),
                }));
                setNfts(formattedSampleData);
                setNftsCopy(formattedSampleData);
            }
        };

        fetchData();
    }, []);

    const handleCategoryFilter = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            setNfts(nftsCopy);
        } else {
            const filteredNFTs = nftsCopy.filter(
                ({ category: nftCategory }) => nftCategory === category
            );

            setNfts(filteredNFTs);
        }
    };

    const { t } = useTranslation();
    console.log('nfts', nfts);
    return (
        <div className={Style.searchPage}>
            <AreaChart
                nftData={nfts}
                activeCategory={activeCategory}
            />
            <div className='px-6 pt-6'>
                <div className='flex items-center gap-3'>
                    <div className='w-1 h-12 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full' />
                    <h1 className='text-4xl font-bold text-[var(--primary-color)]'>
                        Featured Collections
                    </h1>
                </div>
            </div>
            <Filter
                onCategoryFilter={handleCategoryFilter}
                activeCategory={activeCategory}
            />
            <div className={Style.nftGrid}>
                <NFTCardTwo
                    NFTData={nfts}
                    className=''
                />
            </div>
            <Brand />
        </div>
    );
};

export default searchPage;
