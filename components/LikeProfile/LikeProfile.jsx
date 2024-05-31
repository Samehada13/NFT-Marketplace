import React from 'react';
import Image from 'next/image';

import Style from './LikeProfile.module.css';
import image from '../../img';

const LikeProfile = () => {
  const imageArray = [image.user1, image.user2, image.user3, image.user4];
  return (
    <div className={Style.like}>
      {imageArray.map((el, i) => (
        <div className={Style.like_box} key={i + 1}>
          <Image src={el} width={15} height={15} key={i + 1} className={Style.like_box_img}/>
        </div>
      ))}
    </div>
  )
}

export default LikeProfile