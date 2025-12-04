import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from 'react-icons/ti';

import Style from './AuthorTaps.module.css';

import { useTranslation } from 'react-i18next';

const AuthorTaps = ({
  setCollectibles,
  setCreated,
  setLike,
  setFollower,
  setFollowing,
  setAbout,
  sortBy,
  setSortBy
}) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");

  const { t } = useTranslation();

  const listArray = [
    t('pages.author.authorTaps.listed'),
    t('pages.author.authorTaps.owned'),
    t('pages.author.authorTaps.myBid'),
    t('pages.author.authorTaps.nftBid'),
    'About',
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'popular', label: 'Most Popular' },
  ];

  useEffect(() => {
    setSelectedMenu(listArray[activeBtn - 1]);
  }, [activeBtn]);

  const openDropDownList = () => {
    if (!openList) {
      setOpenList(true);
    } else {
      setOpenList(false);
    }
  }

  const openTab = (e) => {
    const btnText = e.target.innerText;
    console.log(btnText);
    if (btnText == t('pages.author.authorTaps.listed')) {
      setCollectibles(true);
      setCreated(false);
      setFollower(false);
      setLike(false);
      setFollowing(false);
      setAbout(false);
      setActiveBtn(1);
    } else if (btnText == t('pages.author.authorTaps.owned')) {
      setCollectibles(false);
      setCreated(true);
      setFollower(false);
      setLike(false);
      setFollowing(false);
      setAbout(false);
      setActiveBtn(2);
    } else if (btnText == t('pages.author.authorTaps.myBid')) {
      setCollectibles(false);
      setCreated(false);
      setFollower(false);
      setLike(true);
      setFollowing(false);
      setAbout(false);
      setActiveBtn(3);
    } else if (btnText == t("pages.author.authorTaps.nftBid")) {
      setCollectibles(false);
      setCreated(false);
      setFollower(true);
      setLike(false);
      setFollowing(false);
      setAbout(false);
      setActiveBtn(4);
    } else if (btnText == 'About') {
      setCollectibles(false);
      setCreated(false);
      setFollower(false);
      setLike(false);
      setFollowing(false);
      setAbout(true);
      setActiveBtn(5);
    }
  }

  const handleSortChange = (value) => {
    setSortBy(value);
    setOpenList(false);
  };

  return (
    <div className={Style.authorTaps}>
      <div className="flex justify-between items-center w-full">
        <div className={Style.authorTaps_box_left}>
          <div className={Style.authorTaps_box_left_btn}>
            <button className={`${activeBtn == 1 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}>{t('pages.author.authorTaps.listed')}{""}</button>
            <button className={`${activeBtn == 2 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}>{t('pages.author.authorTaps.owned')}{""}</button>
            <button className={`${activeBtn == 3 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}>{t('pages.author.authorTaps.myBid')}{""}</button>
            <button className={`${activeBtn == 4 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}>{t('pages.author.authorTaps.nftBid')}{""}</button>
            <button className={`${activeBtn == 5 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}>About{""}</button>
          </div>
        </div>

        {/* Sorting Dropdown - Only show when not on About tab */}
        {activeBtn !== 5 && (
          <div className='relative'>
            <div
              className='flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 transition-all duration-300'
              onClick={openDropDownList}
            >
              <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort By'}
              </p>
              {openList ? <TiArrowSortedUp className='text-gray-600 dark:text-gray-400' /> : <TiArrowSortedDown className='text-gray-600 dark:text-gray-400' />}
            </div>
            {openList && (
              <div className='absolute right-0 top-12 z-50 w-48 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden'>
                {sortOptions.map((option, i) => (
                  <div
                    key={i}
                    onClick={() => handleSortChange(option.value)}
                    className='flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200'
                  >
                    <p className='text-sm text-gray-700 dark:text-gray-300'>{option.label}</p>
                    {sortBy === option.value && <TiTick className='text-blue-600 dark:text-blue-400' />}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthorTaps