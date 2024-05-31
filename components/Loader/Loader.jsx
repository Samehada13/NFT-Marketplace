import React from 'react'
import Image from 'next/image'

import Style from './Loader.module.css'
import image from '../../img'

const Loader = () => {
  return (
    <div className={Style.loader}>
        <div className={Style.loader_box}>
            <div className={Style.loader_box_img}>
                <Image src={image.Loader} alt='Loader' width={200} height={200} 
                className={Style.loader_box_img_img} objectFit='cover'/>
            </div>
        </div>
    </div>
  )
}

export default Loader