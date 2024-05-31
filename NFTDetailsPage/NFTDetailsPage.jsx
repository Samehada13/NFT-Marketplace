import React from 'react'

import Style from './NFTDetailsPage.module.css'
import {NFTDescription, NFTDetailsImg, NFTTabs} from './NFTDetailsPageIndex'

const NFTDetailsPage = ({nft, placeBid, acceptBid, fetchBidsForNFT}) => {
  return (
    <div className={Style.nftDetailsPage}>
      <div className={Style.nftDetailsPage_box}>
        <NFTDetailsImg nft={nft}/>
        <NFTDescription 
          nft={nft} 
          placeBid={placeBid} 
          acceptBid={acceptBid} 
          fetchBidsForNFT={fetchBidsForNFT}
        />
      </div>
    </div>
  )
}

export default NFTDetailsPage