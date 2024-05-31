import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';

import Style from './Brand.module.css';
import image from '../../img';
import {Button} from '../../components/componentIndex';

const Brand = () => {
    const router = useRouter();

    const { t } = useTranslation();

  return (
    <div className={Style.brand}>
        <div className={Style.brand_box}>
            <div className={Style.brand_box_left}>
                
                <h1>{t('pages.home.brand.efc')}</h1>
                <p>{t('pages.home.brand.acreweb')}</p>
                <div className={Style.brand_box_left_btn}>
                    <Button btnName={t('pages.home.brand.mint')} handleClick={()=> router.push('/uploadNFT')}/>
                    <Button btnName={t('pages.home.brand.discover')} handleClick={()=>router.push('/searchPage')}/>
                </div>
            </div>
            <div className={Style.brand_box_right}>
                <Image src={image.earn} alt="Logo" width={800} height={600}/>
            </div>
        </div>
    </div>
  )
}

export default Brand

// Removed line 20       <Image src={image.logo} alt="Logo" width={100} height={100}/>