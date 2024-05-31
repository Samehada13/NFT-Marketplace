import React, {useContext, useEffect, useState} from 'react'
import Image from 'next/image'

import Style from './Error.module.css'
import image from '../../img'

import {NFTMarketplaceContext} from '../../context/NFTMarketplaceContext'

const Error = () => {
    const {error, setOpenError} = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.error} onClick={() => setOpenError(false)}>
        <div className={Style.error_box}>
            <div className={Style.error_box_info}>
                <Image alt="error" src={image.error} width={200} height={200} 
                className={Style.error_box_info_img}/>
                <p>{error}</p>
            </div>
        </div>
    </div>
  )
}

export default Error