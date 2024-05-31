import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {MdVerified, MdCloudUpload, MdOutlineReportProblem} from 'react-icons/md';
import {FiCopy} from 'react-icons/fi';
import {TiSocialFacebook, TiSocialTwitter, TiSocialLinkedin, TiSocialYoutube, TiSocialInstagram} from 'react-icons/ti';
import {BsThreeDots} from 'react-icons/bs';
import { useRouter } from 'next/router';

import Style from './AuthorProfileCard.module.css';
import image from '../../img';
import {Button} from '../../components/componentIndex';

const AuthorProfileCard = ({currentAccount}) => {
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const [currentURL, setCurrentURL] = useState('');

  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);


  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  }

  const openShare = () => {
    if(!share){
      setShare(true);
      setReport(false);
    }else{
      setShare(false);
    }
  }
  const openReport = () => {
    if(!report){
      setReport(true);
      setShare(false);
    }else{
      setReport(false);
    }
  }

  const shareOnSocialMedia = (socialMedia) => {
    const shareURL = encodeURIComponent(currentURL);
    switch (socialMedia) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareURL}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${shareURL}`, '_blank');
        break;
      case 'youtube':
        // Provide a link to your YouTube channel or video
        alert("YouTube sharing is not supported due to platform restrictions.");
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareURL}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div className={Style.authorProfileCard}>
      <div className={Style.authorProfileCard_box}>
        <div className={Style.authorProfileCard_box_img}>
          <Image src={image.nft_image_1}
          className={Style.authorProfileCard_box_img_img}
          alt='NFT image'
          width={220}
          height={220}/>
        </div>
        <div className={Style.authorProfileCard_box_info}>
          <h2>
            {currentAccount.slice(0, 8)}{" "}...{" "}
            {currentAccount.slice(-6)} <MdVerified/>{" "}
          </h2>
          <div className={Style.authorProfileCard_box_info_address}>
            <input type='text' value={address ? address : currentAccount} id='myInput'/>
            <FiCopy onClick={()=> copyAddress()} className={Style.authorProfileCard_box_info_address_icon}/>
          </div>
            <p>
              Expressing emotions, shaping narratives, and painting worlds; artists 
              create beauty, provoke thoughts, and captivate hearts with boundless 
              creativity.
            </p>
            <div className={Style.authorProfileCard_box_info_social}>
            <a href='#' onClick={() => shareOnSocialMedia('facebook')}>
              <TiSocialFacebook />
            </a>
            <a href='#' onClick={() => shareOnSocialMedia('twitter')}>
              <TiSocialTwitter />
            </a>
            <a href='#' onClick={() => shareOnSocialMedia('youtube')}>
              <TiSocialYoutube />
            </a>
            <a href='#' onClick={() => shareOnSocialMedia('linkedin')}>
              <TiSocialLinkedin />
            </a>
          </div>
        </div>
        <div className={Style.authorProfileCard_box_share}>  
        <MdCloudUpload onClick={() => openShare()} className={Style.authorProfileCard_box_share_icon} />
          {share && (
            <div className={Style.authorProfileCard_box_share_upload}>
              <a href='#' onClick={() => shareOnSocialMedia('facebook')}>
                <p><span>
                  <TiSocialFacebook />
                </span>{" "}
                  {""}
                  Facebook
                </p>
              </a>
              <a href='#' onClick={() => shareOnSocialMedia('twitter')}>
                <p><span>
                  <TiSocialTwitter />
                </span>{" "}
                  {""}
                  Twitter
                </p>
              </a>
              <a href='#' onClick={() => shareOnSocialMedia('linkedin')}>
                <p><span>
                  <TiSocialLinkedin />
                </span>{" "}
                  {""}
                  LinkedIn
                </p>
              </a>
              <a href='#' onClick={() => shareOnSocialMedia('youtube')}>
                <p><span>
                  <TiSocialYoutube />
                </span>{" "}
                  {""}
                  Youtube
                </p>
              </a>
            </div>
          )}
          {/* <BsThreeDots onClick={()=> openReport()} 
          className={Style.authorProfileCard_box_share_icon}/>
          {report && (
            <p className={Style.authorProfileCard_box_share_report}>
              <span>
                <MdOutlineReportProblem/>
              </span>{" "}
              {""}
              Report Abuse
            </p>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default AuthorProfileCard