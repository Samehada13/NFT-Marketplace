import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {TiArrowSortedDown, TiArrowSortedUp, TiTick} from 'react-icons/ti';

import Style from './AuthorTaps.module.css';

import { useTranslation } from 'react-i18next';

const AuthorTaps = ({setCollectibles, setCreated, setLike, setFollower, setFollowing}) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");

  const { t } = useTranslation();

  const listArray = [
    t('pages.author.authorTaps.listed'),
    t('pages.author.authorTaps.owned'),
    t('pages.author.authorTaps.myBid'),
    t('pages.author.authorTaps.nftBid'),
    t('pages.author.authorTaps.followers'),
  ];

  useEffect(() => {
    setSelectedMenu(listArray[activeBtn - 1]);
  }, activeBtn);

  // const listArray = [
  //   "Created by Admin",
  //   "Most Appreciated",
  //   "Most Discussed",
  //   "Most Viewed"
  // ]

  const openDropDownList = () => {
    if(!openList){
      setOpenList(true);
    }else{
      setOpenList(false);
    }
  }

  const openTab = (e)=>{
    const btnText = e.target.innerText;
    console.log(btnText);
    if(btnText == t('pages.author.authorTaps.listed')){
      setCollectibles(true);
      setCreated(false);
      setFollower(false);
      setLike(false);
      setFollowing(false);
      setActiveBtn(1);
    }else if(btnText == t('pages.author.authorTaps.owned')){
      setCollectibles(false);
      setCreated(true);
      setFollower(false);
      setLike(false);
      setFollowing(false);
      setActiveBtn(2);
    }else if(btnText == t('pages.author.authorTaps.myBid')){
      setCollectibles(false);
      setCreated(false);
      setFollower(false);
      setLike(true);
      setFollowing(false);
      setActiveBtn(3);
    }else if(btnText == t("pages.author.authorTaps.nftBid")){
      setCollectibles(false);
      setCreated(false);
      setFollower(true);
      setLike(false);
      setFollowing(false);
      setActiveBtn(4);
    }
  }

  return (
    <div className={Style.authorTaps}>
      <div className={Style.authorTaps_box}>
        <div className={Style.authorTaps_box_left}>
          <div className={Style.authorTaps_box_left_btn}>
            <button className={`${activeBtn == 1 ? Style.active : ""}`} 
            onClick={(e)=> openTab(e)}>{t('pages.author.authorTaps.listed')}{""}</button>
            <button className={`${activeBtn == 2 ? Style.active : ""}`} 
            onClick={(e)=> openTab(e)}>{t('pages.author.authorTaps.owned')}{""}</button>
            <button className={`${activeBtn == 3 ? Style.active : ""}`} 
            onClick={(e)=> openTab(e)}>{t('pages.author.authorTaps.myBid')}{""}</button>
            <button className={`${activeBtn == 4 ? Style.active : ""}`} 
            onClick={(e)=> openTab(e)}>{t('pages.author.authorTaps.nftBid')}{""}</button>
            {/* <button className={`${activeBtn == 5 ? Style.active : ""}`} 
            onClick={(e)=> openTab(e)}>Followers{""}</button> */}
          </div>
        </div>
        {/* <div className={Style.authorTaps_box_right}>
          <div className={Style.authorTaps_box_right_para} onClick={()=> openDropDownList()}>
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp/> : <TiArrowSortedDown/>}
          </div>
          {openList && (
            <div className={Style.authorTaps_box_right_list}>
              {listArray.map((el, i)=>(
                <div key={i + 1} onClick={()=> setSelectedMenu(el)} 
                className={Style.authorTaps_box_right_list_item}>
                  <p>{el}</p>
                  <span>{selectedMenu == el && <TiTick/>}</span>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </div>
  )
}

export default AuthorTaps