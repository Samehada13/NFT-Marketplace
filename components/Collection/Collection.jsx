import React, {useState, useEffect} from 'react';
import {
    BsFillAlarmFill,
    BsCalendarDateFill,
    BsCalendar3
} from 'react-icons/bs';
import DaysComponents from './DaysComponents/DaysComponents';

import Style from './Collection.module.css';
import image from '../../img';

const Collection = () => {
    const [popular, setPopular] = useState(true);
    const [following, setFollowing] = useState(false);
    const [news, setNews] = useState(false);



    const cardArray = [
    {
        background: image.creatorbackground1,
        user: image.user1,
    },
    {
        background: image.creatorbackground2,
        user: image.user2,
    },
    {
        background: image.creatorbackground3,
        user: image.user3,
    },
    {
        background: image.creatorbackground4,
        user: image.user4,
    },
    {
        background: image.creatorbackground5,
        user: image.user5,
    },
    {
        background: image.creatorbackground6,
        user: image.user6,
    },
    {
        background: image.creatorbackground7,
        user: image.user7,
    },
    {
        background: image.creatorbackground8,
        user: image.user8,
    }
    ];
    const newsArray = [
    {
        background: image.creatorbackground6,
        user: image.user6,
    },
    {
        background: image.creatorbackground7,
        user: image.user7,
    },
    {
        background: image.creatorbackground2,
        user: image.user2,
    },
    {
        background: image.creatorbackground3,
        user: image.user3,
    },
    {
        background: image.creatorbackground8,
        user: image.user8,
    },
    {
        background: image.creatorbackground1,
        user: image.user1,
    },
    ];
    const followingArray = [
    {
        background: image.creatorbackground3,
        user: image.user3,
    },
    {
        background: image.creatorbackground7,
        user: image.user7,
    },
    {
        background: image.creatorbackground8,
        user: image.user8,
    },
    {
        background: image.creatorbackground1,
        user: image.user1,
    },
    {
        background: image.creatorbackground6,
        user: image.user6,
    },
    {
        background: image.creatorbackground2,
        user: image.user2,
    },
    ];

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
  return (
    <div className={Style.collection}>
        <div className={Style.collection_title}>
            <h2>Top List Creators</h2>
            <div className={Style.collection_collections}>
                <div className={Style.collection_collections_btn}>
                    <button onClick={()=> openPopular()}>
                        <BsFillAlarmFill /> Last 24 Hours
                    </button>
                    <button onClick={()=> openFollower()}>
                        <BsCalendar3 /> Last 7 Days
                    </button>
                    <button onClick={()=> openNews()}>
                        <BsCalendarDateFill /> Last 30 Days
                    </button>
                </div>
            </div>
        </div>
        {
            popular && (
                <div className={Style.collection_box}>
                    {
                        cardArray.map((el, i)=> (
                            <DaysComponents key={i + 1} i={i} el={el}/>
                        ))}
                </div>
            )
        }
        {
            following && (
                <div className={Style.collection_box}>
                    {
                        followingArray.map((el, i)=> (
                            <DaysComponents key={i + 1} i={i} el={el}/>
                        ))}
                </div>
            )
        }
        {
            news && (
                <div className={Style.collection_box}>
                    {
                        newsArray.map((el, i)=> (
                            <DaysComponents key={i + 1} i={i} el={el}/>
                        ))}
                </div>
            )
        }
    </div>
  )
}

export default Collection