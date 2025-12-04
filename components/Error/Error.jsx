import React, {useContext, useEffect, useState} from 'react'
import Lottie from 'lottie-react'

import Style from './Error.module.css'
import image from '../../img'

import {NFTMarketplaceContext} from '../../context/NFTMarketplaceContext'

const Error = () => {
    const {error, setOpenError} = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.error} onClick={() => setOpenError(false)}>
        <div className={Style.error_box}>
            <div className={Style.error_box_info}>
                <Lottie animationData={image.error} loop={true} style={{width: 250, height: 250}} 
                className={Style.error_box_info_img}/>
                <p className='!text-2xl'>{error}</p>
            </div>
        </div>
    </div>
  )
}

export default Error