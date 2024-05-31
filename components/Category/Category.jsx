import React from 'react';
import Image from 'next/image';
import {BsCircleFill} from 'react-icons/bs';

import Style from './Category.module.css';
import image from '../../img';

const Category = () => {
    const CategoryArray = [
        image.creatorbackground10,
        image.creatorbackground4,
        image.creatorbackground11,
        image.creatorbackground5,
        image.creatorbackground9,
        image.creatorbackground7
    ];
  return (
    <div className={Style.box_category}>
        <div className={Style.category}>
        {
            CategoryArray.map((el,i) => (
                <div className={Style.category_box} key={1 + 1}>
                    <Image src={el} className={Style.category_box_img} alt="Background image" width={350} height={150} objectFit="Cover"/>
                    <div className={Style.category_box_title}>
                        <span>
                            <BsCircleFill/>
                        </span>
                        <div className={Style.category_box_title_info}>
                            <h4>Entertainment</h4>
                            <small>1555 NFTs</small>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
    </div>
    
  )
}

export default Category