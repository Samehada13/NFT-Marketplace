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
    setOpenList(!openList);
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
      <div className={Style.authorTaps_container}>
        {/* Tab Buttons */}
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

        {/* Controls - Only show when not on About tab */}
        {activeBtn !== 5 && (
          <div className={Style.authorTaps_controls}>
            {/* Sort Dropdown */}
            <div className={Style.sortDropdown}>
              <button
                className={Style.sortButton}
                onClick={openDropDownList}
              >
                <span>{sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort By'}</span>
                {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
              </button>
              {openList && (
                <div className={Style.sortMenu}>
                  {sortOptions.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleSortChange(option.value)}
                      className={`${Style.sortOption} ${sortBy === option.value ? Style.active : ''}`}
                    >
                      <span>{option.label}</span>
                      {sortBy === option.value && <TiTick />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthorTaps