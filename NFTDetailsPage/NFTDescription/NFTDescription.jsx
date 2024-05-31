import React, {useState, useContext, useEffect} from 'react';
import Image from 'next/image';
import {MdVerified, MdCloudUpload, MdTimer, 
  MdReportProblem, MdOutlineDeleteSweep} from 'react-icons/md';
import { useRouter } from 'next/router';
import {BsThreeDots} from 'react-icons/bs';
import {FaWallet, FaPercentage} from 'react-icons/fa';
import { BiDownload } from 'react-icons/bi';
import {TiSocialFacebook, TiSocialTwitter, TiSocialLinkedin, 
  TiSocialInstagram,TiSocialYoutube} from 'react-icons/ti';
import {BiTransferAlt, BiDollar} from 'react-icons/bi';
import Link from 'next/link';
import Author from '../../pages/author'

import Style from './NFTDescription.module.css';
import image from '../../img';
import {NFTTabs} from '../NFTDetailsPageIndex';
import {Button} from '../../components/componentIndex';
import formStyle from '../../accountPage/Form/Form';

import { useTranslation } from 'react-i18next';

import { NFTMarketplaceContext } from '../../context/NFTMarketplaceContext';

const NFTDescription = ({nft, placeBid, acceptBid, fetchBidsForNFT}) => {

  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provenance, setProvenance] = useState(false);
  const [owner, setOwner] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [isNFTOwnedByCurrentUser, setIsNFTOwnedByCurrentUser] = useState(/* Add your logic here */);
  const [showFormatModal, setShowFormatModal] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  
  const router = useRouter();

  const {t} = useTranslation();

  const downloadImage = () => {
    setShowFormatModal(true);
  };
  

  const historyArray = [
    image.user1,
    image.user2,
    image.user3,
    image.user4,
    image.user5,
  ]

  const provenanceArray = [
    image.user5,
    image.user8,
    image.user3,
    image.user10,
    image.user7,
  ]

  const ownerArray = [
    image.user9,
    image.user7,
    image.user3,
    image.user5,
    image.user1,
  ]

  const openSocial = ()=>{
    if(!social){
      setSocial(true);
      setNFTMenu(false);
    }else{
      setSocial(false);
    }
  }

  const openNFTMenu = ()=>{
    if(!NFTMenu){
      setNFTMenu(true);
      setSocial(false);
    }else{
      setNFTMenu(false);
    }
  }

  const openTabs =(e)=>{
    const btnText = e.target.innerText;

    if(btnText == "Bid History"){
      setHistory(true);
      setProvenance(false);
      setOwner(false);
    }else if(btnText == "Provenance"){
      setHistory(false);
      setProvenance(true);
      setOwner(false);
    }
  }

  const openOwner=()=>{
    if(!owner){
      setOwner(true);
      setHistory(false);
      setProvenance(false);
    }else{
      setOwner(false);
      setHistory(true);
    }
  }

  const handleDownload = (format) => {
    actualDownloadImage(format);
  };
  
  const actualDownloadImage = async (format) => {
    const imageURL = nft.image;
  
    if (!imageURL) {
      console.error('Image URL is not available.');
      return;
    }
  
    try {
      const response = await fetch(imageURL);
  
      if (!response.ok) {
        console.error('Failed to fetch image.');
        return;
      }
  
      const blob = await response.blob();
  
      const link = document.createElement('a');
  
      link.href = window.URL.createObjectURL(blob);
  
      link.download = `${nft.name}_${nft.tokenId}.${format}`;
  
      document.body.appendChild(link);
  
      link.click();
  
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error during image download:', error);
    }
  };
  
  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handlePlaceBid = async () => {
    try {
      console.log("Button clicked! Token ID:", nft.tokenId, "Bid Amount:", bidAmount);
      await placeBid(nft.tokenId, bidAmount);
  
      router.push('/searchPage');
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const fetchedBids = await fetchBidsForNFT(nft.tokenId);
        setBids(fetchedBids);
        console.log('Fetched bids:', fetchedBids); // Add this line
      } catch (error) {
        console.error('Error fetching bids for NFT:', error);
      }
    };
  
    if (nft.tokenId && fetchBidsForNFT) {
      fetchBids();
    }
  }, [nft.tokenId, fetchBidsForNFT]);
    
  
  const { 
    placeBid: contextPlaceBid, 
    buyNFT, 
    currentAccount} = useContext(NFTMarketplaceContext);

  const [showConfirmation, setShowConfirmation] = useState(false);

  // const handleConfirmation = async (confirm) => {
  //     try {
  //         if (confirm) {
  //             await buyNFT(nft);
  //             // router.push(`/author?purchased=success`);
  //             router.push(`/author?purchased=success&seller=${nft.seller}`);
  //         } else {
  //             router.push(`/author?purchased=failure`);
  //         }
  //     } catch (error) {
  //         console.error('Error during purchase:', error);
  //         router.push(`/author?purchased=failure`);
  //     }
  //     setShowConfirmation(false);
  // };
    const handleConfirmation = async (confirm) => {
      try {
          if (confirm) {
              await buyNFT(nft);
              router.push(`/author?purchased=success&seller=${nft.seller}`);
          } else {
              router.push(`/author?purchased=failure`);
          }
      } catch (error) {
          console.error('Error during purchase:', error);
          router.push(`/author?purchased=failure`);
      }
      setShowConfirmation(false);
  };



  const shareOnFacebook = () => {
    const shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(shareURL, '_blank');
  };  

  const shareOnTwitter = () => {
    const shareURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`;
    window.open(shareURL, '_blank');
  };

  const shareOnLinkedIn = () => {
    const shareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(shareURL, '_blank');
  };

  const shareOnYouTube = () => {
    alert("YouTube sharing is not supported due to platform restrictions.");
  };
  

  return (
    <div className={Style.NFTDescription}>
      {/* <Author setOpenReviewDialog={setOpenReviewDialog} /> */}
      <div className={Style.NFTDescription_box}>
        <div className={Style.NFTDescription_box_share}>
          <p>{nft.category}</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload className={Style.NFTDescription_box_share_box_icon}
            onClick={()=> openSocial()}/>
            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href='#' onClick={shareOnFacebook}>
                  <TiSocialFacebook /> Facebook
                </a>
                <a href='#' onClick={shareOnTwitter}>
                  <TiSocialTwitter /> Twitter
                </a>
                <a href='#' onClick={shareOnLinkedIn}>
                  <TiSocialLinkedin /> LinkedIn
                </a>
                <a href='#' onClick={shareOnYouTube}>
                  <TiSocialYoutube /> Youtube
                </a>
              </div>
            )}
          </div>
        </div>
        <div className={Style.NFTDescription_box_profile}>
          <h1 className={`${Style.nftName}`}>{nft.name} #{nft.tokenId}</h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image src={image.user1} 
              alt='Profile'
              width={40}
              height={40}
              className={Style.NFTDescription_box_profile_box_left_img}/>
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>{t('pages.nftDetails.nftDetailsImg.creator')}</small><br/>
                <Link href={{pathname: "/author", query: {address: nft.seller}}}>
                <span>
                {nft.seller.slice(0, 8)}{" "}...{" "}
                {nft.seller.slice(-6)} <MdVerified/>
                </span>
                </Link>
              </div>
            </div>
            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image src={image.creatorbackground1} 
                alt='Profile'
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}/>
              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>{t('pages.nftDetails.nftDetailsImg.collection')}</small><br/>
                <span>
                  Abstract <MdVerified/>
                </span>
              </div>
            </div>
          </div>
        
        <div className={Style.NFTDescription_box_profile_biding}>
          <div className={Style.NFTDescription_box_profile_biding_box_price}>
            <div className={Style.NFTDescription_box_profile_biding_box_price_bid}>
              <small>{t('pages.nftDetails.nftDetailsImg.currentBid')}</small>
              <p>
                {nft.price} Matic <span></span>
              </p>
            </div>
            <span>[{t('pages.nftDetails.nftDetailsImg.stock')}]</span>
          </div>
          <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {currentAccount === nft.seller.toLowerCase() ? (
                  <div className={Style.cantBuyContainer}>
                    <p>{t('pages.nftDetails.nftDetailsImg.youCantBuy')}</p>
                  </div>
              ) : currentAccount === nft.owner.toLowerCase() ? (
                <>
                  <Button 
                    icon={<FaWallet />}
                    btnName={t('pages.nftDetails.nftDetailsImg.listOnMarketplace')}
                    handleClick={() => {
                      router.push(`/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
                    }}
                    classStyle={Style.button}
                  />
                  <Button
                    icon={<BiDownload />}
                    btnName={t('pages.nftDetails.nftDetailsImg.downloadImage')}
                    handleClick={downloadImage}
                    classStyle={Style.downloadButton}
                  />
                </>
              ) : (
              <>
                <Button
                  icon={<FaWallet />}
                  btnName={t('pages.nftDetails.nftDetailsImg.buyNft')}
                  handleClick={() => setShowConfirmation(true)}
                  classStyle={Style.button}
                />

                {!isNFTOwnedByCurrentUser && (
                  <Button
                    icon={<FaPercentage />}
                    btnName={t('pages.nftDetails.nftDetailsImg.makeOffer')}
                    handleClick={() => setShowBidForm(true)}
                    classStyle={Style.button}
                  />
                )}
              </>
            )}
          </div>
          {showConfirmation && (
            <div className={Style.confirmationDialog}>
              <h2>{t('pages.nftDetails.nftDetailsImg.dialogBox.h2')}</h2>
              <p><b>{t('pages.nftDetails.nftDetailsImg.dialogBox.price')} {nft.price} Matic</b></p>
              <div className={Style.buttonContainer}>
                <Button btnName={t('pages.nftDetails.nftDetailsImg.dialogBox.yes')} handleClick={() => handleConfirmation(true)} />
                <Button btnName={t('pages.nftDetails.nftDetailsImg.dialogBox.no')} handleClick={() => handleConfirmation(false)} />
              </div>
            </div>
          )}
          {showBidForm && currentAccount !== nft.seller.toLowerCase() && currentAccount !== nft.owner.toLowerCase() && (
          <div className={Style.NFTDescription_box_profile_biding_box_bidForm}>
            <label htmlFor="bidAmount">{t('pages.nftDetails.nftDetailsImg.dialogBox.yourBidAmount')}</label>
            <input
              type="number"
              id="bidAmount"
              value={bidAmount}
              onChange={handleBidAmountChange}
              placeholder={t('pages.nftDetails.nftDetailsImg.dialogBox.enterBidAmount')}
            />
            <Button
              icon={<BiDollar />}
              btnName={t('pages.nftDetails.nftDetailsImg.dialogBox.placeBid')}
              handleClick={handlePlaceBid}
              classStyle={Style.button}
            />
          </div>
        )}
          {showFormatModal && (
          <div className={Style.formatModal}>
            <p>{t('pages.nftDetails.nftDetailsImg.dialogBox.chooseImageFormat')}</p>
            <button onClick={() => handleDownload('png')}>PNG</button>
            <button onClick={() => handleDownload('jpg')}>JPG</button>
            <button onClick={() => handleDownload('gif')}>GIF</button>
            <button onClick={() => handleDownload('pdf')}>PDF</button>
            <button onClick={() => setShowFormatModal(false)}>{t('pages.nftDetails.nftDetailsImg.dialogBox.cancel')}</button>
          </div>
        )}

          {nft.bids && nft.bids.length > 0 && (
            <div className={Style.NFTDescription_box_profile_biding_box_acceptButton}>
              <Button
                icon={<BiDollar />}
                btnName={t('pages.nftDetails.nftDetailsImg.dialogBox.acceptHighestBid')}
                handleClick={acceptBid}
                classStyle={Style.button}
              />
            </div>
          )}
              
          <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
            <button onClick={(e)=> openTabs(e)}>{t('pages.nftDetails.nftDetailsImg.dialogBox.topBid')}</button>
          </div>

          {history && (
            <div className={Style.NFTDescription_box_profile_biding_box_card}>
              <NFTTabs dataTab={bids} acceptBid={acceptBid} currentAccount={currentAccount} nft={nft}/>
            </div>
          )}

        </div>
      </div>
      </div>
    </div>
  )
}

export default NFTDescription