import React from 'react';
import {motion} from 'framer-motion';
import Image from 'next/image';

import Style from './SliderCard.module.css';
import image from '../../../img';
import LikeProfile from '../../LikeProfile/LikeProfile';

const SliderCard = ({el, i}) => {
  return (
    <motion.div className={Style.sliderCard}>
      <div className={Style.sliderCard_box}>
        <motion.div className={Style.sliderCard_box_img}>
          <Image className={Style.sliderCard_box_img_img} src={el.background} alt="Slider Profile" width={500} height={300} objectFit="Cover"/>
        </motion.div>
          <div className={Style.sliderCard_box_title}>
            <p>NFT Video #672</p>
            <div className={Style.sliderCard_box_title_like}>
              {/* <LikeProfile /> */}
              <small>1 of 100</small>
            </div>
          </div>
          <div className={Style.sliderCard_box_price}>
            <div className={Style.sliderCard_box_price_box}>
              <small>Current Bid</small>
              <p>1.000 ETH</p>
            </div>
            <div className={Style.sliderCard_box_price_time}>
              <small>Remaining Time</small>
              <p>3h : 8m : 52s</p>
            </div>
          </div>
      </div>
    </motion.div>
  )
}

export default SliderCard