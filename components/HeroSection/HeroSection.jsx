import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Style from './HeroSection.module.css';
import {Button} from '../componentIndex';
import image from '../../img';

import { useTranslation } from 'react-i18next';

const Home = () => {

  const { t } = useTranslation();

  const router = useRouter();

  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>{t('pages.home.heroSection.h1')}</h1>
          {/* <p>{t('pages.home.heroSection.h2')}</p> */}
          <Button btnName={t('pages.home.heroSection.search')} handleClick={()=> router.push('/searchPage')}/>
        </div>
        <div className={Style.heroSection_box_right}>
          <Image src={image.home} alt="Hero Section" width={600} height={350}/>
        </div>
      </div>
    </div>
  )
}

export default Home