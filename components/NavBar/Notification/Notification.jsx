import React from 'react';
import Link from 'next/link';

import Style from "./Notification.module.css";
import image from "../../../img";

const Notification = () => {
  return (
    <div className={Style.notification}>
      <p>Notification</p>
      <div className={Style.notification_box}>
        <div className={Style.notification_box_img}>
          <image src={image.user1} alt="Profile image" width={50} height={50} className={Style.notification_box_img}/>
        </div>
        <div className={Style.notification_box_info}>
          <h4>Ruben</h4>
          <p>Measure action your user ...</p>
          <small>5 minutes ago</small>
        </div>
        <span className={Style.notification_box_new}></span>
      </div>
    </div>
  )
}

export default Notification;