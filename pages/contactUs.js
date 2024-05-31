import React from 'react'
import {HiOutlineMail} from 'react-icons/hi'
import {TiSocialFacebook, 
    TiSocialTwitter, 
    TiSocialInstagram, 
    TiSocialYoutube, 
    TiSocialLinkedin} from 'react-icons/ti'

import Style from '../styles/contactUs.module.css'
import formStyle from '../accountPage/Form/Form.module.css'
import {Button} from '../components/componentIndex'

const contactUs = () => {
  return (
    <div className={Style.contactUs}>
        <div className={Style.contactUs_box}>
            <h1>We’d love to hear from you!</h1>
            <div className={Style.contactUs_box_box}>
                <div className={Style.contactUs_box_box_left}>
                    <div className={Style.contactUs_box_box_left_item}>
                        <h3>Address:</h3>
                        <p>Santa Cruz, Labo, Camarines Nrte</p>
                    </div>
                    <div className={Style.contactUs_box_box_left_item}>
                        <h3>Email:</h3>
                        <p>rlb_nft.support@gmail.com</p>
                    </div>
                    <div className={Style.contactUs_box_box_left_item}>
                        <h3>Phone Number:</h3>
                        <p>+63907095520</p>
                    </div>
                    <div className={Style.contactUs_box_box_left_item}>
                        <h3>Socials</h3>
                        <a href="https://www.facebook.com/icreate.l">
                            <TiSocialFacebook/>
                        </a>
                        <a href="https://twitter.com/BLeyano">
                            <TiSocialTwitter/>
                        </a>
                        <a href="https://www.instagram.com/nftmplace/">
                            <TiSocialInstagram/>
                        </a>
                        <a href="#">
                            <TiSocialLinkedin/>
                        </a>
                        <a href="https://www.youtube.com/@burnfayrYT">
                            <TiSocialYoutube/>
                        </a>
                    </div>
                </div>
                <div className={Style.contactUs_box_box_right}>
                    <form>
                        <div className={formStyle.form_box_input}>
                            <label htmlFor='name'>Full Name</label>
                            <input type='text' required
                            placeholder='Full Name'
                            className={formStyle.form_box_input_userName}/>
                        </div>
                        <div className={formStyle.form_box_input}>
                            <label htmlFor='email'>Email</label>
                            <div className={formStyle.form_box_input_box}>
                                <div className={formStyle.form_box_input_box_icon}>
                                    <HiOutlineMail />
                                </div>
                            <input type='text' required placeholder='Email*'/>
                            </div>
                        </div>
                        <div className={formStyle.form_box_input}>
                            <label htmlFor='description'>Message</label>
                            <textarea name='' id='' cols={30} rows={6} required
                            placeholder='Write something about yourself'></textarea>
                        </div>
                        <Button btnName="Send Message"
                        handleClick={()=> {}}
                        classStyle={Style.button}/>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default contactUs