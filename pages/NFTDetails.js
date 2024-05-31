import React, {useEffect, useContext, useState} from 'react'
import { useRouter } from 'next/router';

import {Button, Brand, Category, Title} from '../components/componentIndex';
import NFTDetailsPage from '../NFTDetailsPage/NFTDetailsPage';

import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';

import { useTranslation } from 'react-i18next';

const NFTDetails = () => {
  const {currentAccount, placeBid, acceptBid, fetchBidsForNFT} = useContext(NFTMarketplaceContext)

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    creator: ""
  })
  console.log('sssssss', nft);

  const router = useRouter();
  useEffect(()=>{
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);

  const { t } = useTranslation();

  useEffect(() => {
    if (!router.isReady) return;
    console.log('Router query:', router.query); // Log router query to verify data
    setNft(router.query);
  }, [router.isReady]);
  

  return (
    <div>
        <NFTDetailsPage 
          nft={nft} 
          placeBid={placeBid} 
          acceptBid={acceptBid} 
          fetchBidsForNFT={fetchBidsForNFT}
        />
        {/* <Category /> */}

        <Brand />
    </div>
  )
}

export default NFTDetails

// Removed line 49         <Title heading={t('pages.nftDetails.earn')}/>