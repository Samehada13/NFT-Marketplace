import React, {useState} from 'react';
import Image from 'next/image';
import {MdVerified} from 'react-icons/md';
import {TiTick} from 'react-icons/ti';

import Style from './FollowerTabCard.module.css';
import image from '../../../img'

const FollowerTabCard = ({i, el}) => {
  const [following, setFollowing] = useState(false);

  const followMe = () => {
    if(!following){
      setFollowing(true);
    }else{
      setFollowing(false);
    }
  }

  return (
    <div className={Style.followerTabCard}>
      <div className={Style.followerTabCard_rank}>
        <p>
          #{i + 1}<span>🥇</span>
        </p>
      </div>
      <div className={Style.followerTabCard_box}>
        <div className={Style.followerTabCard_box_img}>
          <Image className={Style.followerTabCard_box_img_img}
          src={el.background || image.creatorbackground5}
          alt="Profile Background"
          width={500}
          height={300}
          objectFit="cover"/>
        </div>
        <div className={Style.followerTabCard_box_profile}>
          <Image className={Style.followerTabCard_box_profile_img} alt="Profile Picture" 
          width={50} height={50} src={el.user || image.user1}/>
        </div>
        <div className={Style.followerTabCard_box_info}>
          <div className={Style.followerTabCard_box_info_name}>
            <h4>
                {el.seller.slice(0, 12)}{" "}...{" "}
                {el.seller.slice(-9)} <span><MdVerified /></span>
            </h4>
            <p>NFTs Volume: <b>{el.total || 0} Matic</b></p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default FollowerTabCard