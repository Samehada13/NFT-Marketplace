import React from 'react'
import { MdWarning } from 'react-icons/md'

import Style from './NFTDetailsPage.module.css'
import { NFTDescription, NFTDetailsImg, NFTText } from './NFTDetailsPageIndex'

const NFTDetailsPage = ({ nft, placeBid, acceptBid, fetchBidsForNFT }) => {
  // Check if this is sample data
  const isSampleData = nft.isSampleData === true;


  return (
    <div className={Style.nftDetailsPage}>
      {isSampleData && (
        <div className={Style.sampleWarning}>
          <MdWarning className={Style.warningIcon} />
          <span>This is sample data for demonstration purposes only. This NFT cannot be purchased or bid on.</span>
        </div>
      )}
      <div className={Style.nftDetailsPage_box}>
        <NFTDetailsImg nft={nft} />
        <NFTDescription
          nft={nft}
          placeBid={placeBid}
          acceptBid={acceptBid}
          fetchBidsForNFT={fetchBidsForNFT}
        />
      </div>
      <div className={Style.nftDetailsPage_fullWidth}>
        <NFTText
          nft={nft}
        />
      </div>
    </div>
  )
}

export default NFTDetailsPage
