import Link from 'next/link';

import { useTranslation } from 'react-i18next';


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
        <div key = {i + 1} className="menu-item">
          <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default Discover;