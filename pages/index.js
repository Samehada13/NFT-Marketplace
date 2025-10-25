import React, { useState, useContext, useEffect } from 'react';

import Style from '../styles/index.module.css';
import {HeroSection, Service, BigNFTSlider, Subscribe, 
  Title, Category, Filter, NFTCard, Collection, FollowerTab, 
  AudioLive, Slider, Brand, Video, Loader, BTC} from "../components/componentIndex";
import { getTopCreators } from '../TopCreators/TopCreators';
import { useTranslation } from 'react-i18next';

import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

const index = () => {
  const { checkIfWalletConnected, currentAccount } = useContext(NFTMarketplaceContext);
  useEffect(()=> {
    checkIfWalletConnected();
  }, []);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  const creators = getTopCreators(nfts);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // if(currentAccount){
          const items = await fetchNFTs();
          const reversedItems = items.slice().reverse();
    
          setNfts(reversedItems);
          setNftsCopy(reversedItems);
        // }

      } catch (error) {
        console.log("Error while fetching NFTs", error);
      }
    };
  
    fetchData();
  }, []);

  const handleCategoryFilter = (category) => {
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

  return (
      <div className={Style.homePage}>
        <HeroSection/>
        <Service/>
        {/* <BigNFTSlider nftData={nfts}/> */}
        {/* <Title 
          heading={t('pages.home.title')} 
          // paragraph={t('pages.home.subtitle')} 
        /> */} 
        
        {/* <Filter onCategoryFilter={handleCategoryFilter}/>
        {nfts.length == 0 ? <Loader/> : <NFTCard nftData={nfts}/>}} */}

        {creators.length == 0 ? <Loader/> : <FollowerTab TopCreators={creators}/>}
        <BTC />
        {/* <div style={{ fontSize: '1.5em', margin: '10%', marginTop: '2%', marginBottom: '5%' }}>
          NFT Marketplace Contract Address: 
          <a href="https://amoy.polygonscan.com/address/0xfab46273936c613e8c1a0dda75f82dcb1d154c9b" target="_blank" rel="noopener noreferrer">
            <span style={{ fontWeight: 'bold' }}> 0xFab46273936c613e8C1A0ddA75f82dCB1d154c9B</span>
          </a>
        </div> */}
        <Brand />
        {/* <Video /> */}
      </div>
  );
};

export default index;
