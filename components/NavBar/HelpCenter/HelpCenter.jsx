import React from 'react'
import Link from 'next/link';

import { useTranslation } from 'react-i18next';

import Style from './HelpCenter.module.css';

const HelpCenter = () => {

  const { t } = useTranslation();

  const helpCenter = [
    {
      name: t('pages.home.footer.helpCenter.about'),
      link: "aboutUs",
    },
    {
      name: t('pages.home.footer.helpCenter.contactUs'),
      link: "contactUs",
    },
  ];
  return (
    <div className={Style.box}>
      {
        helpCenter.map((el, i)=>(
          <div className={Style.helpCenter} key={i + 1}>
            <Link href={{pathname: `${el. link}`}}>{el.name}</Link>
          </div>
        ))
      }
    </div>
  )
}

export default HelpCenter;