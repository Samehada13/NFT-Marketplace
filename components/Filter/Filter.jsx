import React, { useState } from 'react';
import {FaFilter, FaAngleDown, FaAngleUp, FaWallet, FaMusic, FaVideo, FaImages, FaUserAlt} from 'react-icons/fa';
import {AiFillCloseCircle} from 'react-icons/ai';
import {MdVerified} from 'react-icons/md';
import {Titick} from 'react-icons/ti';

import { useTranslation } from 'react-i18next';

import Style from './Filter.module.css';

const Filter = ({ onCategoryFilter, activeCategory }) => {
    const [filter, setFilter] = useState(true);
    // const [image, setImage] = useState(true);
    // const [video, setVideo] = useState(true);
    // const [music, setMusic] = useState(true);

const openFilter = ()=> {
    if(!filter){
        setFilter(true);
    }else{
        setFilter(false);
    }
}

// const openImage = ()=> {
//     if(!image){
//         setImage(true);
//     }else{
//         setImage(false);
//     }
// }

// const openVideo = ()=> {
//     if(!video){
//         setVideo(true);
//     }else{
//         setVideo(false);
//     }
// }

// const openMusic = ()=> {
//     if(!music){
//         setMusic(true);
//     }else{
//         setMusic(false);
//     }
// }

const handleCategoryFilter = (category) => {
    onCategoryFilter(category);
}

const { t } = useTranslation();
  return (
    <div className={Style.filter}>
        <div className={Style.filter_box}>
            <div className={Style.filter_box_left}>
                <button
                    className={activeCategory === 'All' ? Style.activeCategory : ''}
                    onClick={() => handleCategoryFilter('All')}
                >{t('pages.home.filter.all')}</button>
                <button
                    className={activeCategory === 'Painting' ? Style.activeCategory : ''}
                    onClick={() => handleCategoryFilter('Painting')}
                >{t('pages.home.filter.painting')}</button>
                <button
                    className={activeCategory === 'Drawing' ? Style.activeCategory : ''}
                    onClick={() => handleCategoryFilter('Drawing')}
                >{t('pages.home.filter.drawing')}</button>
                <button
                    className={activeCategory === 'Sculpture' ? Style.activeCategory : ''}
                    onClick={() => handleCategoryFilter('Sculpture')}
                >{t('pages.home.filter.sculpture')}</button>
                <button
                    className={activeCategory === 'Printmaking' ? Style.activeCategory : ''}
                    onClick={() => handleCategoryFilter('Printmaking')}
                >{t('pages.home.filter.printMaking')}</button>
                <button
                    className={activeCategory === 'Photography' ? Style.activeCategory : ''}
                    onClick={() => handleCategoryFilter('Photography')}
                >{t('pages.home.filter.photography')}</button>
                <button
                    className={activeCategory === 'Digital Art' ? Style.activeCategory : ''}
                    onClick={() => handleCategoryFilter('Digital Art')}
                >{t('pages.home.filter.digitalArt')}</button>
                
            </div>
            <div className={Style.filter_box_right}>
                <div className={Style.filter_box_right_box} onClick={()=>openFilter()}>
                    <FaFilter/>
                    <span>{t('pages.home.filter.filter')}</span>{filter ? <FaAngleDown/> : <FaAngleUp/>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Filter