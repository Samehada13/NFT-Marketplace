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
      {/*<Banner bannerImage={images.creatorbackground8}/>*/}
      {/* <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch}/> */}
      {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Collections
            </h1>
          </div>
          <p className="text-gray-400 text-lg ml-4">
            Discover this week's curated collections
          </p>
        </div>
      <Filter onCategoryFilter={handleCategoryFilter} />
      <NFTCardTwo NFTData={nfts}/>
      <BTC />
      <Brand />
    </div>
  )
}

export default searchPage

// Removed line 82       <Title heading={t('pages.searchPage.earnFreeCyrpto.heading')}/>