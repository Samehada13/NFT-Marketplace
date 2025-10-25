import { useState, useEffect } from 'react';
import { RiUserFollowFill, RiAwardLine } from 'react-icons/ri';

import Style from './FollowerTab.module.css';
import FollowerTabCard from './FollowerTabCard/FollowerTabCard';
import image from '../../img';
import News from './News/News';

import { useTranslation } from 'react-i18next';

const FollowerTab = ({ TopCreators }) => {
  const FollowingArray = [
    {
      background: image.creatorbackground6,
      user: image.user6,
      seller: 'odosjfod00023dlsmlsmfs',
    },
    {
      background: image.creatorbackground7,
      user: image.user7,
      seller: 'odosjfod00023dlsmlsmfs',
    },
    {
      background: image.creatorbackground2,
      user: image.user2,
      seller: 'odosjfod00023dlsmlsmfs',
    },
    {
      background: image.creatorbackground3,
      user: image.user3,
      seller: 'odosjfod00023dlsmlsmfs',
    },
    {
      background: image.creatorbackground8,
      user: image.user8,
      seller: 'odosjfod00023dlsmlsmfs',
    },
    {
      background: image.creatorbackground1,
      user: image.user1,
      seller: 'odosjfod00023dlsmlsmfs',
    },
  ];
  const NewsArray = [
    {
      background: image.creatorbackground3,
      user: image.user3,
      seller: '0x3a2b1c9d8e7f6a5b',
      price: '0.27',
      change: '+12.5%',
      total: '1.2K',
      title: 'CryptoPunks'
    },
    {
      background: image.creatorbackground7,
      user: image.user7,
      seller: '0x4b3c2d1e9f8a7b6c',
      price: '0.35',
      change: '+8.3%',
      total: '2.8K',
      title: 'Bored Ape Yacht Club'
    },
    {
      background: image.creatorbackground8,
      user: image.user8,
      seller: '0x5c4d3e2f1a9b8c7d',
      price: '0.19',
      change: '+5.7%',
      total: '0.9K',
      title: 'Doodles'
    },
    {
      background: image.creatorbackground1,
      user: image.user1,
      seller: '0x6d5e4f3a2b1c9d8e',
      price: '0.42',
      change: '+15.3%',
      total: '1.5K',
      title: 'Otherdeed for Otherside'
    },
    {
      background: image.creatorbackground6,
      user: image.user6,
      seller: '0x7f6e5d4c3b2a1f9e',
      price: '0.31',
      change: '+3.2%',
      total: '2.1K',
      title: 'Azuki'
    },
    {
      background: image.creatorbackground2,
      user: image.user2,
      seller: '0x8a9b8c7d6e5f4a3b',
      price: '0.24',
      change: '+9.8%',
      total: '1.8K',
      title: 'CloneX'
    },
  ];

  const enhancedPopularCards = [
    ...TopCreators,
    {
      background: image.creatorbackground9,
      user: image.user9,
      seller: '0x9a8b7c6d5e4f3a2b1',
      price: '0.42',
      change: '+15.3%',
      total: '2.1K'
    },
    {
      background: image.creatorbackground10,
      user: image.user10,
      seller: '0x0a9b8c7d6e5f4a3b',
      price: '0.38',
      change: '+8.9%',
      total: '1.8K'
    },
    {
      background: image.creatorbackground11,
      user: image.user1, // Reusing user1 as we don't have user11
      seller: '0x1b2c3d4e5f6a7b8c',
      price: '0.55',
      change: '+22.1%',
      total: '2.7K'
    },
    {
      background: image.creatorbackground4,
      user: image.user4,
      seller: '0x2c3d4e5f6a7b8c9d',
      price: '0.31',
      change: '+5.7%',
      total: '1.5K'
    }
  ];

  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  const openPopular = () => {
    if (!popular) {
      setPopular(true);
      setFollowing(false);
      setNews(false);
    }
  };
  const openFollower = () => {
    if (!following) {
      setPopular(false);
      setFollowing(true);
      setNews(false);
    }
  };
  const openNews = () => {
    if (!news) {
      setPopular(false);
      setFollowing(false);
      setNews(true);
    }
  };

  const { t } = useTranslation();

  return (
    <div className='primary-bg p-6'>
      <div className='text-center'>
        <h2 className='text-4xl text-white font-semibold'>
          {t('pages.home.followerTab.tcl')}
        </h2>
        <div className={Style.followerTab_tabs}>
          <div className='flex flex-row justify-center gap-4 py-4'>
            <button
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors ${
                popular 
                  ? 'bg-white text-primary' 
                  : 'bg-transparent text-white hover:bg-white/10'
              }`}
              onClick={openPopular}
            >
              <RiUserFollowFill /> {t('pages.home.followerTab.popular')}
            </button>
            <button
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors ${
                news 
                  ? 'bg-white text-primary' 
                  : 'bg-transparent text-white hover:bg-white/10'
              }`}
              onClick={openNews}
            >
              <RiAwardLine className="w-5 h-5" /> 
              <span className="whitespace-nowrap">{t('pages.home.followerTab.news')}</span>
            </button>
          </div>
        </div>
      </div>
      {popular && (
        <div className="flex flex-col md:flex-row gap-4">
          {enhancedPopularCards.map((el, i) => (
            <FollowerTabCard
              key={i + 1}
              i={i}
              el={el}
            />
          ))}
        </div>
      )}
      {following && (
        <div className="flex flex-col md:flex-row gap-4">
          {FollowingArray.map((el, i) => (
            <FollowerTabCard
              key={i + 1}
              i={i}
              el={el}
            />
          ))}
        </div>
      )}
      {news && (
        <div className={Style.followerTab_tabs_box}>
          {NewsArray.map((el, i) => (
            <FollowerTabCard
              key={`news-${i}`}
              i={i}
              el={el}
            />
          ))}
        </div>
      )}
      {/* <div className={Style.followerTab_member}>
            <div className={Style.followerTab_member_box}>
                <a href='#'>{t('pages.home.followerTab.smm')}</a>
                <a href='#'>{t('pages.home.followerTab.ba')}</a>
            </div>
        </div> */}
    </div>
  );
};

export default FollowerTab;
