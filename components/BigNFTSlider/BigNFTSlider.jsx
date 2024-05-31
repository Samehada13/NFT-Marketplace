// import React, {useState, useEffect, useCallback} from 'react';
// import Image from 'next/image';
// import {AiFillFire, AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
// import {MdVerified, MdTimer, MdNote} from 'react-icons/md';
// import {TbArrowBigLeftLine, TbArrowBigRightLine} from 'react-icons/tb';

// import { useRouter } from 'next/router';
// import Style from './BigNFTSlider.module.css';
// import image from '../../img';
// import Button from '../Button/Button';

// const BigNFTSlider = ({nftData}) => {

// if (!nftData || nftData.length === 0) {
//     return null; 
//   }

//   const visibleNFTData = nftData.slice(0, 4);

//   const [idNumber, setIdNumber] = useState(0); 

//   const inc = useCallback(() => {
//     setIdNumber((prevId) => (prevId + 1) % visibleNFTData.length);
//   }, [visibleNFTData.length]);

//   const dec = useCallback(() => {
//     setIdNumber((prevId) => (prevId - 1 + visibleNFTData.length) % visibleNFTData.length);
//   }, [visibleNFTData.length]);

//   const currentNFT = visibleNFTData[idNumber];
//   const router = useRouter();
//   return (
//     <div className={Style.bigNFTSlider}>
//         <div className={Style.bigNFTSlider_box}>
//             <div className={Style.bigNFTSlider_box_left}>
//                 <h2>{currentNFT.name}</h2>
//                 <div className={Style.bigNFTSlider_box_left_creator}>
//                     <div className={Style.bigNFTSlider_box_left_creator_profile}>
//                         <Image className={Style.bigNFTSlider_box_left_creator_profile_img} 
//                         src={image.user1} 
//                         alt="Profile image" width={50} height={50}/>
//                         <div className={Style.bigNFTSlider_box_left_creator_profile_img}>
//                             <p>Seller</p>
//                             <h4>{currentNFT.seller.slice(0, 6)}{" "}...{" "}
//                                 {currentNFT.seller.slice(-4)}
//                                 <span>
//                                     <MdVerified/>
//                                 </span>
//                             </h4>
//                         </div>
//                     </div>
//                     <div className={Style.bigNFTSlider_box_left_creator_collection}>
//                         <AiFillFire className={Style.bigNFTSlider_box_left_creator_collection_icon}/>
//                         <div className={Style.bigNFTSlider_box_left_creator_collection_info}>
//                             <p>Category</p>
//                             <h4>{currentNFT.category}</h4>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={Style.bigNFTSlider_box_left_bidding}>
//                     <div className={Style.bigNFTSlider_box_left_bidding_box}>
//                         <small>Current Bid</small>
//                         <p><b>{currentNFT.price} Matic</b><span> </span></p>
//                     </div>
//                     <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
//                         <MdNote className={Style.bigNFTSlider_box_left_bidding_box_icon}/>
//                         <span>Details</span>
//                     </p>
//                     <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
//                         <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
//                             <p>{currentNFT.royalties} %</p>
//                             <span>Royalties</span>
//                         </div>
//                         <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
//                             <p>{currentNFT.fileSize} MB</p>
//                             <span>File size</span>
//                         </div>
//                         <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
//                             <p>{currentNFT.properties}</p>
//                             <span>Properties</span>
//                         </div>
//                     </div>
//                     <div className={Style.bigNFTSlider_box_left_button}>
//                         <Button btnName="Place" handleClick={()=>{}}/>
//                         <Button btnName="View" handleClick={()=>router.push('/searchPage')}/>
//                     </div>
//                 </div>
//                 <div className={Style.bigNFTSlider_box_left_sliderBtn}>
//                     <TbArrowBigLeftLine className={Style.bigNFTSlider_box_left_sliderBtn_icon} onClick={()=>dec()}/>
//                     <TbArrowBigRightLine className={Style.bigNFTSlider_box_left_sliderBtn_icon} onClick={()=>inc()}/>
//                 </div>
//             </div>  
//             <div className={Style.bigNFTSlider_box_right}>
//                 <div className={Style.bigNFTSlider_box_right_box}>
//                     <Image src={currentNFT.image} 
//                     alt="NFT Image" 
//                     className={Style.bigNFTSlider_box_right_box_img}
//                     layout="fill"/>
//                     <div className={Style.bigNFTSlider_box_right_box_like}>
//                         <AiFillHeart/>
//                         <span>45</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default BigNFTSlider

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AiFillFire, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdVerified, MdTimer, MdNote } from 'react-icons/md';
import { TbArrowBigLeftLine, TbArrowBigRightLine } from 'react-icons/tb';
import { useRouter } from 'next/router';

import Style from './BigNFTSlider.module.css';
import image from '../../img';
import Button from '../Button/Button';

const BigNFTSlider = ({ nftData }) => {

  if (!nftData || nftData.length === 0) {
    return null; 
  }

  const visibleNFTData = nftData.slice(0, 4);
  const [idNumber, setIdNumber] = useState(0); 
  const router = useRouter();

  const inc = useCallback(() => {
    setIdNumber((prevId) => (prevId + 1) % visibleNFTData.length);
  }, [visibleNFTData.length]);

  const dec = useCallback(() => {
    setIdNumber((prevId) => (prevId - 1 + visibleNFTData.length) % visibleNFTData.length);
  }, [visibleNFTData.length]);

  const currentNFT = visibleNFTData[idNumber];

  const handleViewClick = () => {
    router.push({
      pathname: '/NFTDetails',
      query: currentNFT,
    });
  };

  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{currentNFT.name}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image className={Style.bigNFTSlider_box_left_creator_profile_img} 
                src={image.user1} 
                alt="Profile image" width={50} height={50} />
              <div className={Style.bigNFTSlider_box_left_creator_profile_img}>
                <p>Seller</p>
                <h4>{currentNFT.seller.slice(0, 6)}...{currentNFT.seller.slice(-4)}
                  <span><MdVerified /></span>
                </h4>
              </div>
            </div>
            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire className={Style.bigNFTSlider_box_left_creator_collection_icon} />
              <div className={Style.bigNFTSlider_box_left_creator_collection_info}>
                <p>Category</p>
                <h4>{currentNFT.category}</h4>
              </div>
            </div>
          </div>
          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Current Bid</small>
              <p><b>{currentNFT.price} Matic</b><span> </span></p>
            </div>
            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdNote className={Style.bigNFTSlider_box_left_bidding_box_icon} />
              <span>Details</span>
            </p>
            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                <p>{currentNFT.royalties} %</p>
                <span>Royalties</span>
              </div>
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                <p>{currentNFT.fileSize} MB</p>
                <span>File size</span>
              </div>
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                <p>{currentNFT.properties}</p>
                <span>Properties</span>
              </div>
            </div>
            <div className={Style.bigNFTSlider_box_left_button}>
              <Button btnName="Place" handleClick={handleViewClick} />
              <Button btnName="View" handleClick={handleViewClick} />
            </div>
          </div>
          <div className={Style.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLine className={Style.bigNFTSlider_box_left_sliderBtn_icon} onClick={dec} />
            <TbArrowBigRightLine className={Style.bigNFTSlider_box_left_sliderBtn_icon} onClick={inc} />
          </div>
        </div>
        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <Image src={currentNFT.image} 
              alt="NFT Image" 
              className={Style.bigNFTSlider_box_right_box_img}
              layout="fill" />
            <div className={Style.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BigNFTSlider;
