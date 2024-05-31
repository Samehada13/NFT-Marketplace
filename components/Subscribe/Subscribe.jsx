import React from 'react';
import Image from 'next/image';
import {RiSendPlaneFill} from 'react-icons/ri'

import Style from './Subscribe.module.css';
import image from '../../img';

const Subscribe = () => {
  return (
    <div className={Style.subscribe}>
        <div className={Style.subscribe_box}>
            <div className={Style.subscribe_box_left}>
                <h2>Never missed a drop</h2>
                <p>
                    Subscribe to our super-exclusive drop list and be the first
                </p>
                <div className={Style.subscribe_box_left_box}>
                    <span>01</span>
                    <small>Get more discount</small>
                </div>
                <div className={Style.subscribe_box_left_box}>
                    <span>02</span>
                    <small>Get premium</small>
                </div>
                <div className={Style.subscribe_box_left_input}>
                    <input type="email" placeholder="Enter your email"/>
                    <RiSendPlaneFill className={Style.subscribe_box_left_input_icon}/>
                </div>
            </div>
            <div className={Style.subscribe_box_right}>
                <Image src={image.update} alt="Get update" height={600} width={800}/>
            </div>
        </div>
    </div>
  )
}

export default Subscribe