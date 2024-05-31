import React from 'react';
import Image from 'next/image';
import {TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube, TiSocialInstagram} from 'react-icons/ti';

import Style from './collectionProfile.module.css';
import image from '../../img';

const collectionProfile = () => {
  const cardArray = [1, 2, 3, 4];
  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image
            src={image.nftsale8}
            alt='nft image'
            width={800}
            height={800}
            className={Style.collectionProfile_box_left_img}
          />
          <div className={Style.collectionProfile_box_left_social}>
            <a href='#'>
              <TiSocialFacebook/>
            </a>
            <a href='#'>
              <TiSocialLinkedin/>
            </a>
            <a href='#'>
              <TiSocialTwitter/>
            </a>
            <a href='#'>
              <TiSocialYoutube/>
            </a>
            <a href='#'>
              <TiSocialInstagram/>
            </a>
          </div>
        </div>
        <div className={Style.collectionProfile_box_middle}>
          <h1>Awesome NFTs COllection</h1>
          <p>Awesome NFTs COllection Awesome NFTs COllection Awesome NFTs COllection Awesome NFTs COllection
          Awesome NFTs COllection Awesome NFTs COllection Awesome NFTs COllection Awesome NFTs COllection
          Awesome NFTs COllection Awesome NFTs COllection Awesome NFTs COllection
          </p>
          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((el, i)=>(
              <div className={Style.collectionProfile_box_middle_box_item} key={i + 1}>
                <small>Floor price</small>
                <p>${i + 1}45,998</p>
                <span>+{i + 2}.67%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default collectionProfile