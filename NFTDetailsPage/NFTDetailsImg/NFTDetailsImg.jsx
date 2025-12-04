import React, { useState } from 'react';
import Image from 'next/image';
import { BsImages } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import Style from './NFTDetailsImg.module.css';
import image from '../../img'

import { useTranslation } from 'react-i18next';

const NFTDetailsImg = ({ nft }) => {

  const [like, setLike] = useState(false)

  const likeNFT = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  }

  const { t } = useTranslation();

  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_like}>
            <BsImages className={Style.NFTDetailsImg_box_NFT_like_icon} />
            <p onClick={() => likeNFT()}>
              {like ? (<AiOutlineHeart className={Style.NFTDetailsImg_box_NFT_like_icon} />) : (
                <AiFillHeart className={Style.NFTDetailsImg_box_NFT_like_icon} />
              )}
            </p>
          </div>
          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <Image src={nft.image}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt='NFT Image'
              width={700}
              height={800}
              objectFit='cover' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTDetailsImg