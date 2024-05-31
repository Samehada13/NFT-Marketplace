import React from 'react'
import Image from 'next/image';
import {FaUserAlt,FaRegImage,FaUserEdit} from 'react-icons/fa';
import { MdArrowBack, MdArrowDownward, MdArrowDropDown, MdArrowOutward, MdHeight, MdHelpCenter } from 'react-icons/md';
import {TbDownloadOff,TbDownload} from 'react-icons/tb';
import Link from 'next/link';
import { MdVerified } from 'react-icons/md';

import { useTranslation } from 'react-i18next';

import Style from './Profile.module.css';
import image from '../../../img';

const Profile = ({currentAccount}) => {

const { t } = useTranslation();

  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image src={image.user1} alt="User Profile" width={50} height={50} className={Style.profile_account_img}/>
        <div className={Style.profile_account_info}>
          <p>{t('navbar.profile.creator.paragraph')}</p>
          <small><span><b>
                {currentAccount.slice(0, 8)}{" "}...{" "}
                {currentAccount.slice(-6)} <MdVerified/>
                </b></span></small>
        </div>
      </div>
      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt/>
            <p>
              <Link href={{pathname: '/author'}}>{t('navbar.profile.creator.myProfile')}</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage/>
            <p>
              <Link href={{pathname: '/author'}}>{t('navbar.profile.creator.myNfts')}</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit/>
            <p>
              <Link href={{pathname: '/account'}}>{t('navbar.profile.creator.editProfile')}</Link>
            </p>
          </div>
        </div>
        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter/>
            <p>
              <Link href={{pathname: "/contactUs"}}>{t('navbar.profile.creator.help')}</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <TbDownload/>
            <p>
              <Link href={{pathname: "/aboutUs"}}>{t('navbar.profile.creator.aboutUs')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;