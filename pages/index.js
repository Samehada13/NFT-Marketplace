import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';

import Style from '../styles/index.module.css';
import {
  HeroSection, Service, BigNFTSlider, Subscribe,
  Title, Category, Filter, NFTCard, Collection, FollowerTab,
  AudioLive, Slider, Brand, Video, Loader, BTC, NFTCollectionsTable
} from "../components/componentIndex";
import { NFTCardTwo } from '../collectionPage/collectionIndex';
import { getTopCreators } from '../TopCreators/TopCreators';
import { useTranslation } from 'react-i18next';
import useSlideIntoView from '../hooks/useSlideIntoView';

import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import { generateSampleNFTs } from '../utils/sampleData';

// Wrapper component for slide-into-view animations (moved outside to prevent re-creation on every render)
const SlideWrapper = React.memo(({ children, delay = 0, direction = 'bottom' }) => {
  const { ref, isVisible } = useSlideIntoView({
    threshold: 0.1,
    direction,
    delay
  });

  return (
    <div
      ref={ref}
      className={`${Style.slideContainer} ${Style[`slideFrom${direction.charAt(0).toUpperCase() + direction.slice(1)}`]} ${isVisible ? Style.slideVisible : ''
        }`}
    >
      {children}
    </div>
  );
});

SlideWrapper.displayName = 'SlideWrapper';

const index = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);
  // checkIfWalletConnected is already called in NFTMarketplaceContext on mount
  // No need to call it again here

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const creators = useMemo(() => getTopCreators(nftsCopy), [nftsCopy]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchNFTs();

        if (items && Array.isArray(items) && items.length > 0) {
          const reversedItems = items.slice().reverse();
          setNfts(reversedItems);
          setNftsCopy(reversedItems);
          console.log("Loaded", items.length, "NFTs from blockchain");
        } else {
          console.log("No blockchain NFTs found, using sample data for testing");
          const sampleData = generateSampleNFTs(15);
          const formattedSampleData = sampleData.map(nft => ({
            ...nft,
            price: (parseFloat(nft.price) / 1e18).toFixed(4),
          }));
          setNfts(formattedSampleData);
          setNftsCopy(formattedSampleData);
        }

      } catch (error) {
        console.log("Error while fetching NFTs, using sample data:", error);
        const sampleData = generateSampleNFTs(15);
        const formattedSampleData = sampleData.map(nft => ({
          ...nft,
          price: (parseFloat(nft.price) / 1e18).toFixed(4),
        }));
        setNfts(formattedSampleData);
        setNftsCopy(formattedSampleData);
      }
    };

    fetchData();
  }, []);

  const handleCategoryFilter = useCallback((category) => {
    setActiveCategory(category);
    if (category === 'All') {
    } else {
      const filteredNFTs = nftsCopy.filter(({ category: nftCategory }) => nftCategory === category);

      setNfts(filteredNFTs);
    }
  }, [nftsCopy]);

  const { t } = useTranslation();

  const MemoHeroSection = useMemo(() => <HeroSection />, []);
  const MemoBTC = useMemo(() => <BTC />, []);
  const MemoNFTCollectionsTable = useMemo(() => <NFTCollectionsTable />, []);
  const MemoBrand = useMemo(() => <Brand />, []);

  return (
    <div className={Style.homePage}>
      <SlideWrapper delay={0}>
        {MemoHeroSection}
      </SlideWrapper>

      <SlideWrapper delay={100}>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-12 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full" />
            <h1 className="text-4xl font-bold text-[var(--primary-color)]">
              Explore NFTs
            </h1>
          </div>
        </div>
        <Filter
          onCategoryFilter={handleCategoryFilter}
          activeCategory={activeCategory}
        />
      </SlideWrapper>

      {/* Display filtered NFTs */}
      <SlideWrapper delay={150}>
        <div className={Style.nftGrid}>
          <NFTCardTwo NFTData={nfts} className="" />
        </div>
      </SlideWrapper>

      <SlideWrapper delay={200}>
        {<FollowerTab TopCreators={creators} />}
      </SlideWrapper>

      <SlideWrapper delay={300}>
        {MemoBTC}
      </SlideWrapper>

      <SlideWrapper delay={300}>
        {MemoNFTCollectionsTable}
      </SlideWrapper>

      <SlideWrapper delay={400}>
        {MemoBrand}
      </SlideWrapper>
    </div>
  );
};

export default index;
