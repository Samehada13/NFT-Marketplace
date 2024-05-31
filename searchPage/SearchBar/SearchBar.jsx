import React from 'react';
import { BsSearch, BsArrowRight } from 'react-icons/bs';

import { useTranslation } from 'react-i18next';

import Style from './SearchBar.module.css';

const SearchBar = () => {

  const { t } = useTranslation();

  return (
    <div className={Style.searchBar}>
      <div className={Style.searchBar_box}>
        <BsSearch className={Style.searchBar_box_icon}/>
        <input type='text' placeholder={t('pages.searchPage.searchBar.input')}/>
        <BsArrowRight className={Style.searchBar_box_icon}/>
      </div>
    </div>
  )
}

export default SearchBar