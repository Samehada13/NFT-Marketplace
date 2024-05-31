import React, {useState, useEffect} from 'react';
import {RiUserFollowFill, RiUserUnfollowFill, RiAwardLine} from 'react-icons/ri';   

import Style from './FollowerTab.module.css';
import FollowerTabCard from './FollowerTabCard/FollowerTabCard';
import image from '../../img';
import News from './News/News';

import { useTranslation } from 'react-i18next';

const FollowerTab = ({TopCreators}) => {
    const FollowingArray = [
    {
        background: image.creatorbackground6,
        user: image.user6,
        seller: "odosjfod00023dlsmlsmfs"
    },
    {
        background: image.creatorbackground7,
        user: image.user7,
        seller: "odosjfod00023dlsmlsmfs"
    },
    {
        background: image.creatorbackground2,
        user: image.user2,
        seller: "odosjfod00023dlsmlsmfs"
    },
    {
        background: image.creatorbackground3,
        user: image.user3,
        seller: "odosjfod00023dlsmlsmfs"
    },
    {
        background: image.creatorbackground8,
        user: image.user8,
        seller: "odosjfod00023dlsmlsmfs"
    },
    {
        background: image.creatorbackground1,
        user: image.user1,
        seller: "odosjfod00023dlsmlsmfs"
    },
    ];
    const NewsArray = [
    {
        background: image.creatorbackground3,
        user: image.user3,
        seller: "odosjfod00023dlsmlsmfs"
    },
    {
        background: image.creatorbackground7,
        user: image.user7,
        seller: "odosjfod00023dlsmlsmfs"
    },
    {
        background: image.creatorbackground8,
        user: image.user8,
        seller: "odosjfod00023dlsmlsmfs"
    },
    {
        background: image.creatorbackground1,
        user: image.user1,
        seller: "odosjfod00023dlsmlsmfs"
    },
    {
        background: image.creatorbackground6,
        user: image.user6,
        seller: "odosjfod00023dlsmlsmfs"
    },
    {
        background: image.creatorbackground2,
        user: image.user2,
        seller: "odosjfod00023dlsmlsmfs"
    },
    ];

    const [popular, setPopular] = useState(true);
    const [following, setFollowing] = useState(false);
    const [news, setNews] = useState(false);

    const openPopular = () => {
        if(!popular){
            setPopular(true);
            setFollowing(false);
            setNews(false);
        }
    }
    const openFollower = () => {
        if(!following){
            setPopular(false);
            setFollowing(true);
            setNews(false);
        }
    }
    const openNews = () => {
        if(!news){
            setPopular(false);
            setFollowing(false);
            setNews(true);
        }
    }       

    const { t } = useTranslation();
      
  return (
    <div className={Style.followerTab}>
        <div className={Style.followerTab_title}>
            <h2>{t('pages.home.followerTab.tcl')}</h2>
            <div className={Style.followerTab_tabs}>
                <div className={Style.followerTab_tabs_btn}>
                    <button onClick={()=>openPopular()}>
                        <RiUserFollowFill/> Popular
                    </button>
                    {/* <button onClick={()=>openFollower()}>
                        <RiUserFollowFill/> Following
                    </button> */}
                    <button onClick={()=>openNews()}>
                        <RiAwardLine/> {t('pages.home.followerTab.news')}
                    </button>
                </div>
            </div>
        </div>
        {
            popular && (
                <div className={Style.followerTab_tabs_box}>
                    {TopCreators.map((el, i) => (
                        <FollowerTabCard key={i + 1} i = {i} el = {el}/>
                    ))}
                </div>
            )
        }
        {
            following && (
                <div className={Style.followerTab_tabs_box}>
                    {FollowingArray.map((el, i) => (
                        <FollowerTabCard key={i + 1} i = {i} el = {el}/>
                    ))}
                </div>
            )
        }
        {news && <News />}
        {/* <div className={Style.followerTab_member}>
            <div className={Style.followerTab_member_box}>
                <a href='#'>{t('pages.home.followerTab.smm')}</a>
                <a href='#'>{t('pages.home.followerTab.ba')}</a>
            </div>
        </div> */}
    </div>
  )
}

export default FollowerTab