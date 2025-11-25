import React from 'react'
import Lottie from 'lottie-react'

import Style from './Loader.module.css'
import image from '../../img'

const Loader = () => {
  return (
    <div className="primary-bg">
        <div className={Style.loader_box}>
            <div className={Style.loader_box_img}>
                <Lottie animationData={image.Loader} loop={true} style={{width: 250, height: 250}} 
                className={Style.loader_box_img_img}/>
            </div>
        </div>
    </div>
  )
}

export default Loader