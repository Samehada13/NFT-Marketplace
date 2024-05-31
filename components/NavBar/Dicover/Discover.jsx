import React, { useContext } from 'react'
import Link from 'next/link';

import { useTranslation } from 'react-i18next';

import Style from './Discover.module.css';

const Discover = () => {

  const { t } = useTranslation();

  const discover =[
    {
      name: t('pages.home.footer.discover.search'),
      link: "searchPage"
    },
    {
      name: t('pages.home.footer.discover.mintNft'),
      link: "uploadNFT"
    },
    {
      name: t('pages.home.footer.discover.cw'),
      link: "connectWallet"
    },
    // {
    //   name: t('pages.home.footer.discover.blog'),
    //   link: null
    // }
  ];

  return (
    <div>
      {discover.map((el, i)=> (
        <div key = {i + 1} className={Style.discover}>
          <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default Discover;