import React, { useState, useContext, useEffect } from 'react';

import Style from '../styles/index.module.css';
import {
  HeroSection, Service, BigNFTSlider, Subscribe,
  Title, Category, Filter, NFTCard, Collection, FollowerTab,
  AudioLive, Slider, Brand, Video, Loader, BTC, NFTCollectionsTable
} from "../components/componentIndex";
import { getTopCreators } from '../TopCreators/TopCreators';
import { useTranslation } from 'react-i18next';
import useSlideIntoView from '../hooks/useSlideIntoView';
import NFTCardTwo from '../collectionPage/NFTCardTwo/NFTCardTwo';
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

const index = () => {
  const { checkIfWalletConnected, currentAccount } = useContext(NFTMarketplaceContext);
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const creators = getTopCreators(nfts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if(currentAccount){
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
        console.log("Error while fetching NFTs", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);

    if (category === 'All') {
      // If 'All' is clicked, reset to the full list
      setNfts(nftsCopy);
    } else {
      // Otherwise, filter by the specific category
      const filteredNFTs = nftsCopy.filter(({ category: nftCategory }) => nftCategory === category);

      setNfts(filteredNFTs);
    }
  };

  const { t } = useTranslation();

  // Wrapper component for slide-into-view animations
  const SlideWrapper = ({ children, delay = 0, direction = 'bottom' }) => {
    const { ref, isVisible, direction: slideDirection } = useSlideIntoView({
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
  };

  return (
    <div className={`${Style.homePage} !mt-0 !pt-0`}>
      <SlideWrapper delay={0}>
        <HeroSection />
      </SlideWrapper>

      <SlideWrapper delay={100}>
        <div className="main-bg p-6">
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
          <NFTCardTwo NFTData={nfts} className="main-bg p-6" />
        </div>
      </SlideWrapper>

      <SlideWrapper delay={200}>
        {<FollowerTab TopCreators={creators} />}
      </SlideWrapper>

      <SlideWrapper delay={300}>
        <BTC />
      </SlideWrapper>

      <SlideWrapper delay={300}>
        <NFTCollectionsTable />
      </SlideWrapper>
      {/* <div style={{ fontSize: '1.5em', margin: '10%', marginTop: '2%', marginBottom: '5%' }}>
          NFT Marketplace Contract Address: 
          <a href="https://amoy.polygonscan.com/address/0xfab46273936c613e8c1a0dda75f82dcb1d154c9b" target="_blank" rel="noopener noreferrer">
            <span style={{ fontWeight: 'bold' }}> 0xFab46273936c613e8C1A0ddA75f82dCB1d154c9B</span>
          </a>
        </div> */}

      <SlideWrapper delay={400}>
        <Brand />
      </SlideWrapper>

      {/* <Video /> */}
    </div>
  );
};

export default index;
