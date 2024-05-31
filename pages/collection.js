import React from 'react';

import Style from '../styles/collection.module.css';
import image from '../img';
import {Banner, CollectionProfile, NFTCardTwo, } from '../collectionPage/collectionIndex';
import {Slider, Brand} from '../components/componentIndex';
import Filter from '../components/Filter/Filter';

const collection = () => {
  const collectionArray = [
    image.nftsale1,
    image.nftsale2,
    image.nftsale3,
    image.nftsale4,
    image.nftsale5,
    image.nftsale6,
    image.nftsale7,
    image.nftsale8,
    image.nftsale4,
  ]
  return (
    <div className={Style.collection}>
        <Banner bannerImage={image.creatorbackground1}/>
        <CollectionProfile />
        <Filter/>
        <NFTCardTwo NFTData={collectionArray}/>
        
        <Slider/>
        <Brand/>
    </div>
  )
}

export default collection