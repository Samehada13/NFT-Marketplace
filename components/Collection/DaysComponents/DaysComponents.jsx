import React from 'react';
import Image from 'next/image';
import {MdVerified} from 'react-icons/md';

import Style from './DaysComponents.module.css';
import image from '../../../img';

const DaysComponents = ({el, i}) => {
  return (
    <div className={Style.daysComponent}>
      <div className={Style.daysComponent_box}>
        <div className={Style.daysComponent_box_img}>
          <Image src={el.background} className={Style.daysComponent_box_img_img} alt="Profile Background" width={500} height={300} objectFit="Covers"/>
        </div>
        <div className={Style.daysComponent_box_profile}>
          <Image src={image.creatorbackground2} alt="Profile" width={200} height={200} className={Style.daysComponent_box_img_1} objectFit="Covers"/>
          <Image src={image.creatorbackground2} alt="Profile" width={200} height={200} className={Style.daysComponent_box_img_2} objectFit="Covers"/>
          <Image src={image.creatorbackground2} alt="Profile" width={200} height={200} className={Style.daysComponent_box_img_3} objectFit="Covers"/>
        </div>
        <div className={Style.daysComponent_box_title}>
          <h2>Amazing Collection</h2>
          <div className={Style.daysComponent_box_title_info}>
            <div className={Style.daysComponent_box_title_info_profile}>
              <Image src={el.user} alt="Profile" width={30} height={30} objectFit="Covers" className={Style.daysComponent_box_title_info_profile_img}/>
              <p>Creator<span>Ruben Balon<small><MdVerified/></small></span></p>
            </div>
            <div className={Style.daysComponent_box_title_info_price}>
              <small>1.4 ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DaysComponents