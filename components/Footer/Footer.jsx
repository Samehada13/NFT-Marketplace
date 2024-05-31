

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { TiSocialFacebook, TiSocialTwitter, TiSocialLinkedin, TiSocialInstagram, TiSocialYoutube } from 'react-icons/ti';
import { RiSendPlaneFill } from 'react-icons/ri';
import { Discover, HelpCenter } from '../NavBar/index';
import { useTranslation } from 'react-i18next';
import Style from "./Footer.module.css";
import image from '../../img';

const Footer = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const currentURL = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={image.logo} alt="Footer logo" width={100} height={100} />
          <p>{t('pages.home.footer.paragraph')}</p>
        </div>
        <div className={Style.footer_box_discover}>
          <h3>{t('pages.home.footer.discover')}</h3>
          <Discover />
        </div>
        <div className={Style.footer_box_help}>
          <h3>{t('pages.home.footer.helpCenter')}</h3>
          <HelpCenter />
        </div>
        <div className={Style.subscribe}>
          <h3>{t('pages.home.footer.subscribe')}</h3>
          <div className={Style.subscribe_box}>
            <input type='email' placeholder={t('pages.home.footer.eye')} />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>{t('pages.home.footer.statement')}</p>
          </div>
        </div>
      </div>
      <div className={Style.footer_footer}></div>
      <div className={Style.footer_privacy}>
        <div className={Style.footer_social_and_text}>
          <div className={Style.footer_social}>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`} target="_blank" rel="noopener noreferrer">
              <TiSocialFacebook />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${currentURL}`} target="_blank" rel="noopener noreferrer">
              <TiSocialTwitter />
            </a>
            <a href={`https://www.instagram.com/?url=${currentURL}`} target="_blank" rel="noopener noreferrer">
              <TiSocialInstagram />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?url=${currentURL}`} target="_blank" rel="noopener noreferrer">
              <TiSocialLinkedin />
            </a>
            <a href={`https://www.youtube.com/?url=${currentURL}`} target="_blank" rel="noopener noreferrer">
              <TiSocialYoutube />
            </a>
          </div>
          <p className={Style.footer_copyright}>&copy;2024 GABR</p>
          <p><a href="#" onClick={() => router.push('/privacy_policy')}>Privacy and Policy</a> | <a href="#" onClick={() => router.push('/termsOfService')}>Terms of Service</a></p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
