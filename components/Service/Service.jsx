import React from 'react';
import Image from 'next/image';

import Style from './Service.module.css';
import image from '../../img';

import { useTranslation } from 'react-i18next';

const Service = () => {

const { t } = useTranslation();

  return (
    <div className={Style.service}>
        <div className={Style.service_box}>
            <div className={Style.service_box_items}>
                <Image src={image.service1} alt={t('pages.home.service.box1')} width={100} height={100}/>
                <p className={Style.service_box_items_step}>
                    <span>{t('pages.home.service.step1')}</span>
                </p>
                <h3>{t('pages.home.service.wallet1')}</h3>
                <p>
                    {t('pages.home.service.para1')}
                </p>
            </div>
            <div className={Style.service_box_items}>
                <Image src={image.service2} alt={t('pages.home.service.box2')} width={100} height={100}/>
                <p className={Style.service_box_items_step}>
                    <span>{t('pages.home.service.step2')}</span>
                </p>
                <h3>{t('pages.home.service.wallet2')}</h3>
                <p>
                    {t('pages.home.service.para2')}
                </p>
            </div>
            <div className={Style.service_box_items}>
                <Image src={image.service3} alt={t('pages.home.service.box3')} width={100} height={100}/>
                <p className={Style.service_box_items_step}>
                    <span>{t('pages.home.service.step3')}</span>
                </p>
                <h3>{t('pages.home.service.wallet3')}</h3>
                <p>
                    {t('pages.home.service.para3')}
                </p>
            </div>
            <div className={Style.service_box_items}>
                <Image src={image.service1} alt={t('pages.home.service.box4')} width={100} height={100}/>
                <p className={Style.service_box_items_step}>
                    <span>{t('pages.home.service.step4')}</span>
                </p>
                <h3>{t('pages.home.service.wallet4')}</h3>
                <p>
                    {t('pages.home.service.para4')}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Service