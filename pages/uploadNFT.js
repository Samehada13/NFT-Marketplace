import React, {useState, useEffect, useContext} from 'react';

import Style from '../styles/uploadNFT.module.css';
import {UploadNFT} from '../uploadNFT/UploadNFTIndex';

import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';

import { useTranslation } from 'react-i18next';

const uploadNFT = () => {

    const {uploadIPFS, createNFT} = useContext(NFTMarketplaceContext);

    const { t } = useTranslation();

  return (
    <div className={Style.uploadNFT}>
        <div className={Style.uploadNFT_box}>
            <div className={Style.uploadNFT_box_heading}>
                <h1>{t('pages.uploadNft.h1')}</h1>
                <p>
                    {t('pages.uploadNft.h1.paragraph')} 
                </p>
            </div>
            <div className={Style.uploadNFT_box_title}>
                <h2>{t('pages.uploadNft.image.h2')}</h2>
                <p>
                    {t('pages.uploadNft.image.paragraph')}
                </p>
            </div>
            <div className={Style.uploadNFT_box_form}>
                <UploadNFT uploadIPFS={uploadIPFS} createNFT={createNFT}/>
            </div>
        </div>
    </div>
  )
}

export default uploadNFT