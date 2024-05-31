import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {BsImages} from 'react-icons/bs'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti'
import {MdVerified} from 'react-icons/md';

import Style from './NFTDetailsImg.module.css';
import image from '../../img'

import { useTranslation } from 'react-i18next';

const NFTDetailsImg = ({nft}) => {

  const [descriptions, setDescriptions] = useState(true)
  const [details, setDetails] = useState(true)
  const [like, setLike] = useState(false)

  const openDescription = ()=>{
    if(!descriptions){
      setDescriptions(true);
    }else{
      setDescriptions(false);
    }
  }

  const openDetails = ()=> {
    if(!details){
      setDetails(true);
    }else{
      setDetails(false);
    }
  }

  const likeNFT = ()=> {
    if(!like){
      setLike(true);
    }else{
      setLike(false);
    }
  }

  const {t} = useTranslation();

  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_like}>
            <BsImages className={Style.NFTDetailsImg_box_NFT_like_icon}/>
            <p onClick={()=> likeNFT()}>
              {like ? (<AiOutlineHeart className={Style.NFTDetailsImg_box_NFT_like_icon}/>) : (
                <AiFillHeart className={Style.NFTDetailsImg_box_NFT_like_icon}/>
              )}
              {/* <span>76</span> */}
            </p>
          </div>
          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <Image src={nft.image}
            className={Style.NFTDetailsImg_box_NFT_img_img}
            alt='NFT Image'
            width={700}
            height={800}
            objectFit='cover'/>
          </div>
        </div>
        <div className={Style.NFTDetailsImg_box_description} onClick={()=> openDescription()}>
          <p>{t('pages.nftDetails.nftDetailsImg.description')}</p>
          {descriptions ? <TiArrowSortedUp/> : <TiArrowSortedDown/>}
        </div>
        {descriptions && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>
              {nft.description} 
            </p>
          </div>
        )}
        <div className={Style.NFTDetailsImg_box_details} onClick={()=> openDetails()}>
          <p>{t('pages.nftDetails.nftDetailsImg.details')}</p>
          {details ? <TiArrowSortedUp/> : <TiArrowSortedDown/>}
        </div>
        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
          <small>3000 x 3000 px.Image(1mb)</small>
          <p>
            <small>{t('pages.nftDetails.nftDetailsImg.tokenId')}</small><br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{nft.tokenId}
          </p>
          <hr/>
          <p>
            <small>{t('pages.nftDetails.nftDetailsImg.website')}</small><br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{nft.website}
          </p>
          <hr/>
          <p>
            <small>{t('pages.nftDetails.nftDetailsImg.category')}</small><br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{nft.category}
          </p>
          <hr/>
          <p>
            <small>{t('pages.nftDetails.nftDetailsImg.royalties')}</small><br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{nft.royalties} %
          </p>
          <hr/>
          <p>
            <small>{t('pages.nftDetails.nftDetailsImg.fileSize')}</small><br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{nft.fileSize} MB
          </p>
          <hr/>
          <p>
            <small>{t('pages.nftDetails.nftDetailsImg.properties')}</small><br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{nft.properties}
          </p>
          <hr/>
          <p>
            <small>{t('pages.nftDetails.nftDetailsImg.sellerAddress')}</small><br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{nft.seller}
          </p>
          <hr/>
          <p>
            <small>Creator Address</small><br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{nft.creator} <MdVerified/>
          </p>
          <hr/>
        </div>
        )}
        
      </div>
    </div>
  )
}

export default NFTDetailsImg