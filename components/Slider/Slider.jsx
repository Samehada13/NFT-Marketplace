import React, {useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {TiArrowLeftThick, TiArrowRightThick} from 'react-icons/ti';

import Style from './Slider.module.css';
import SliderCard from './SliderCard/SliderCard';
import image from '../../img';

const Slider = () => {
    const FollowingArray = [
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
    const [width, setWidth] = useState(0);
    const dragSlider = useRef();

    useEffect(()=> {
        setWidth(dragSlider.current.scrollWidth - dragSlider.current.offSetWidth);
    })
    const handleScroll =(direction)=>{
        const {current}=dragSlider;
        const scrollAmount = window.innerWidth > 1800 ? 270: 210;

        if(direction == "left"){
            current.scrollLeft -= scrollAmount;
        }else{
            current.scrollLeft += scrollAmount;
        }
    }
  return (
    <div className={Style.slider}>
        <div className={Style.slider_box}>
            <h2>Explore NFTs Video</h2>
            <div className={Style.slider_box_button}>
                <p>CLick on play icon and enjoy NFTs Video</p>
                <div className={Style.slider_box_button_btn}>
                    <div className={Style.slider_box_button_btn_icon} onClick={() => handleScroll("left")}>
                        <TiArrowLeftThick/>
                    </div>
                    <div className={Style.slider_box_button_btn_icon}  onClick={() => handleScroll("right")}>
                        <TiArrowRightThick/>
                    </div>
                </div>
            </div>
            <motion.div className={Style.slider_box_items} ref={dragSlider}>
                <motion.div ref={dragSlider} className={Style.slider_box_item} drag="x"
                dragConstraints={{right: 0, left: -width}}>
                    {FollowingArray.map((el, i) => (
                        <SliderCard key={i + 1} el={el} i={i}/>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    </div>
  )
}

export default Slider