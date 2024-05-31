import React, {useState, useEffect, useContext} from 'react';

import Style from '../styles/searchPage.module.css';
import {Slider, Brand, Loader, BTC, Title, Category} from '../components/componentIndex';
import {SearchBar} from '../searchPage/searchBarIndex';
import {Filter} from '../components/componentIndex';
import {NFTCardTwo, Banner} from '../collectionPage/collectionIndex';
import images from '../img';

import { useTranslation } from 'react-i18next';

import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';

const searchPage = () => {
  const { fetchNFTs, currentAccount } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if(currentAccount){
          const items = await fetchNFTs();
          const reversedItems = items.slice().reverse();
          console.log(items);
          console.log('Data here:', reversedItems);
    
          setNfts(reversedItems);
          setNftsCopy(reversedItems);
        // }
      } catch (error) {
        console.log("Error while fetching NFTs", error);
      }
    };
  
    fetchData();
  }, []);

  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({name})=> 
    name.toLowerCase().includes(value.toLowerCase()));
  

    if(filteredNFTS.length === 0){
      setNfts(nftsCopy);
    }else{
      setNfts(filteredNFTS);
    }
  }

  const onClearSearch = () => {
    if(nfts.length && nftsCopy.length){
      setNfts(nftsCopy);
    }
  }

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
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground8}/>
      <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch}/>
      <Filter onCategoryFilter={handleCategoryFilter} />
      {nfts.length == 0 ? <Loader/> : <NFTCardTwo NFTData={nfts}/>}
      <Title 
        heading={t('pages.searchPage.cryptoPrice.heading')} 
        paragraph={t('pages.searchPage.cryptoPrice.paragraph')} 
      />
      <BTC />

      <Brand />
    </div>
  )
}

export default searchPage

// Removed line 82       <Title heading={t('pages.searchPage.earnFreeCyrpto.heading')}/>