import {useState, useEffect, useContext} from 'react';
import Style from '../styles/searchPage.module.css';
import {Slider, Brand, Loader, BTC, Title, Category} from '../components/componentIndex';
import {Filter} from '../components/componentIndex';
import {NFTCardTwo, Banner} from '../collectionPage/collectionIndex';
import { useTranslation } from 'react-i18next';
import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';

const searchPage = () => {
  const { fetchNFTs, currentAccount } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

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
    setActiveCategory(category);
    if (category === 'All') {
      setNfts(nftsCopy);
    } else {
      const filteredNFTs = nftsCopy.filter(({ category: nftCategory }) => nftCategory === category);

      setNfts(filteredNFTs);
    }
  };

  const { t } = useTranslation();

  return (
    <div className={Style.searchPage}>
        <div className="px-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-12 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full" />
            <h1 className="text-4xl font-bold text-[var(--primary-color)]">
              Featured Collections
            </h1>
          </div>
        </div>
      <Filter 
        onCategoryFilter={handleCategoryFilter} 
        activeCategory={activeCategory}
      />
      <div className={Style.nftGrid}>
      <NFTCardTwo NFTData={nfts} className="px-6" />
      </div>
      <BTC />
      <Brand />
    </div>
  )
}

export default searchPage
