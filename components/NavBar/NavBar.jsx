
import React, {useState,useEffect, useContext} from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';

import {MdNotifications} from "react-icons/md";
import {BsSearch} from "react-icons/bs";
import {CgMenuLeft, CgMenuRight} from "react-icons/cg";

import Style from "./NavBar.module.css";
import {Discover,HelpCenter,Notification,Profile,SideBar} from "./index";
import {Button, Error} from "../componentIndex";
import image from "../../img";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

import { NFTMarketplaceContext } from '../../context/NFTMarketplaceContext';

const NavBar = () => {  
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const router = useRouter();

  const openMenu = (e) => {
    const btnText = e.target.innerText;
  
    // Check if the clicked menu is already open, if yes, close it
    if ((btnText === t('navbar.discover') && discover) || (btnText === t('navbar.helpCenter') && help)) {
      setDiscover(false);
      setHelp(false);
    } else {
      // Open the clicked menu
      if (btnText === t('navbar.discover')) {
        setDiscover(true);
        setHelp(false);
        setNotification(false);
        setProfile(false);
      } else if (btnText === t('navbar.helpCenter')) {
        setDiscover(false);
        setHelp(true);
        setNotification(false);
        setProfile(false);
      } else {
        setDiscover(false);
        setHelp(false);
        setNotification(false);
        setProfile(false);
      }
    }
  };
  
  const openNotification = ()=> {
    if(!notification){
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    }else{
      setNotification(false);
    }
  }

  const openProfile = ()=>{
    if(!profile){
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    }else{
      setProfile(false);
    }
  }

  const openSideBar = () => {
    if(!openSideMenu){
      setOpenSideMenu(true);
    }else{
      setOpenSideMenu(false);
    }
  }

  const {currentAccount, connectWallet, openError} = useContext(NFTMarketplaceContext);

  const { t } = useTranslation();

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={image.logo}>
            <a href='/'>
              <Image src={image.logo} alt="GABR NFT Marketplace" width={100} height={100}/>
            </a>
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type='text' placeholder={t('navbar.searchPlaceholder')}/>
              <BsSearch onClick={() => {}} className={Style.search_icon}/>
            </div>
          </div>
        </div>
        {/* //end of left section */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            {/* Discover Menu */}
            <p onClick={(e) => openMenu(e)}>{t('navbar.discover')}</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* Help Center */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>{t('navbar.helpCenter')}</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* Notification */}
          {/* <div className={Style.navbar_container_right_notify}>
            <MdNotifications className={Style.notify} onClick={() => openNotification()} />
            {notification && <Notification />}
          </div> */}

          {/* create button section */}
          <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button btnName={t('navbar.connect')} handleClick={() => connectWallet()} />
            ) : (
              <Button btnName={t('navbar.mint')} handleClick={() => router.push("/uploadNFT")} />
            )}
          </div>

          {/* user profile */}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image src={image.user1} alt="Profile" width={40} height={40} onClick={() => openProfile()} className={Style.navbar_container_right_profile} />
              {profile && <Profile currentAccount={currentAccount} />}
            </div>
          </div>

          {/* Language Switcher */}
          <div className={Style.languageSwitcher}>
            <LanguageSwitcher />
          </div>

          {/* Menu Button */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight className={Style.menuIcon} onClick={() => openSideBar()} />
          </div>
        </div>

      </div>

      {/* sidebar component  */}
      {
        openSideMenu && (
          <div className={Style.sideBar}>
            <SideBar setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount} 
            connectWallet={connectWallet}
            />
            
          </div>
        )
      }
      {openError && <Error/>}
    </div>
  )
}

export default NavBar;
