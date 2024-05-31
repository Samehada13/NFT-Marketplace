import React, {useState} from 'react';

import Style from './AuthorNFTCardBox.module.css';
import image from '../../img';
import { NFTCardTwo } from '../../collectionPage/collectionIndex';
import FollowerTabCard from '../../components/FollowerTab/FollowerTabCard/FollowerTabCard';

    const AuthorNFTCardBox = ({
        collectibles, 
        created, 
        like, 
        follower, 
        following, 
        nfts, 
        myNFTs, 
        addressNFTs,
        nftsWithBids,
        nftsWithBidsBidder
    }) => {

    const followerArray = [  
    {
        background: image.creatorbackground1,
        user: image.user3,
        seller: "0udkdnkdlwq46qw6dfsdf4sd6f6646f"
    },
    {
        background: image.creatorbackground2,
        user: image.user4,
        seller: "0udkdnkdlwq46qw6dfsdf4sd6f6646f"
    },
    {
        background: image.creatorbackground3,
        user: image.user1,
        seller: "0udkdnkdlwq46qw6dfsdf4sd6f6646f"
    },
    {
        background: image.creatorbackground4,
        user: image.user10,
        seller: "0udkdnkdlwq46qw6dfsdf4sd6f6646f"
    },
    {
        background: image.creatorbackground5,
        user: image.user7,
        seller: "0udkdnkdlwq46qw6dfsdf4sd6f6646f"
    },
    {
        background: image.creatorbackground7,
        user: image.user2,
        seller: "0udkdnkdlwq46qw6dfsdf4sd6f6646f"
    },
    {
        background: image.creatorbackground8,
        user: image.user3,
        seller: "0udkdnkdlwq46qw6dfsdf4sd6f6646f"
    },

    ]

    const followingArray = [  
    {
        background: image.creatorbackground4,
        user: image.user10,
        seller: "0udkdnkdlwq46qw6dfsdf4sd6f6646f"
    },
    {
        background: image.creatorbackground5,
        user: image.user7,
        seller: "0udkdnkdlwq46qw6dfsdf4sd6f6646f"
    },
    {
        background: image.creatorbackground7,
        user: image.user2,
        seller: "0udkdnkdlwq46qw6dfsdf4sd6f6646f"
    },
    {
        background: image.creatorbackground8,
        user: image.user3,
        seller: "0udkdnkdlwq46qw6dfsdf4sd6f6646f"
    },
    ]

  return (
    <div className={Style.authorNFTCardBox}>
        {collectibles && <NFTCardTwo NFTData={nfts} NFTAddress={addressNFTs}/>}
        {created && <NFTCardTwo NFTData={myNFTs}/>}
        {like && <NFTCardTwo NFTData={nftsWithBids}/>}
        {follower && <NFTCardTwo NFTData={nftsWithBidsBidder}/>}
        {/* {follower && (
            <div className={Style.authorNFTCardBox_box}>
                {followerArray.map((el, i)=> (
                    <FollowerTabCard i={i} el={el}/>
                ))}
            </div>
        )}
        {following && (
            <div className={Style.authorNFTCardBox_box}>
                {followingArray.map((el, i)=> (
                    <FollowerTabCard i={i} el={el}/>
                ))}
            </div>
        )} */}
        
    </div>
  )
}

export default AuthorNFTCardBox