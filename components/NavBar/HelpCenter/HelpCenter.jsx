import React from 'react';
import Link from 'next/link';

import { useTranslation } from 'react-i18next';

const HelpCenter = ({ variant = 'light' }) => {
  const { t } = useTranslation();

  const helpCenter = [
    {
      name: t('pages.home.footer.helpCenter.about'),
      link: 'aboutUs',
    },
    {
      name: t('pages.home.footer.helpCenter.contactUs'),
      link: 'contactUs',
    },
  ];
  return (
    <div>
      {helpCenter.map((el, i) => (
        <div
          className={`menu-item menu-item--${variant}`}
          key={i + 1}
        >
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
