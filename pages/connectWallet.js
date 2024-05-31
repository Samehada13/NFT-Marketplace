import React, {useState, useEffect, useContext} from 'react'
import Image from 'next/image'

import Style from '../styles/connectWallet.module.css'
import image from '../img'

import {NFTMarketplaceContext} from '../context/NFTMarketplaceContext'

import { useTranslation } from 'react-i18next';

const connectWallet = () => {
    const [activeBtn, setActiveBtn] = useState(1);
    const {currentAccount, connectWallet} = useContext(NFTMarketplaceContext);
    const providerArray = [
        {
            provider: image.provider1,
            name: "Metamask",
        },
        {
            provider: image.provider2,
            name: "WalletConnect",
        },
        {
            provider: image.provider3,
            name: "WalletLink",
        },
        {
            provider: image.provider4,
            name: "Formatic",
        },
    ]

    const { t } = useTranslation();

  return (
    <div className={Style.connectWallet}>
        <div className={Style.connectWallet_box}>
            <h1>{t('pages.connectWallet.h1')}</h1>
            <p className={Style.connectWallet_box_para}>
                {t('pages.connectWallet.paragraph')}
            </p>
            <div className={Style.connectWallet_box_provider}>
                {providerArray.map((el, i)=> (
                    <div className={`${Style.connectWallet_box_provider_item} 
                    ${activeBtn == i + 1 ? Style.active : ""}`} 
                    key={i + 1} 
                    onClick={()=> (setActiveBtn(i + 1), connectWallet())}>
                        <Image src={el.provider} 
                        alt={el.provider} 
                        width={50} 
                        height={50}
                        className={Style.connectWallet_box_provider_item_img}/>
                        <p>{el.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default connectWallet