import React from 'react'
import {HiOutlineMail} from 'react-icons/hi'
import {MdOutlineHttp, MdOutlineContentCopy} from 'react-icons/md'
import {TiSocialFacebook, TiSocialTwitter, TiSocialInstagram} from 'react-icons/ti'

import Style from './Form.module.css';
import {Button} from '../../components/componentIndex'

const Form = () => {
  return (
    <div className={Style.form}>
      <div className={Style.form_box}>
        <form>
          <div className={Style.form_box_input}>
            <label htmlFor='name'>Username</label>
            <input type='text'
            placeholder='Ruben Balon'
            className={Style.form_box_input_userName}/>
          </div>
          <div className={Style.form_box_input}>
            <label htmlFor='email'>Email</label>
            <div className={Style.form_box_input_box}>
              <div className={Style.form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input type='text' placeholder='Email*'/>
            </div>
          </div>
          <div className={Style.form_box_input}>
            <label htmlFor='description'>Description</label>
            <textarea name='' id='' cols={30} rows={6} 
            placeholder='Write something about yourself'></textarea>
          </div>
          <div className={Style.form_box_input}>
            <label htmlFor='website'>Website</label>
            <div className={Style.form_box_input_box}>
              <div className={Style.form_box_input_box_icon}>
                <MdOutlineHttp/>
              </div>
              <input type='text' placeholder='website'/>
            </div>
          </div>
          <div className={Style.form_box_input_social}>
            <div className={Style.form_box_input}>
              <label htmlFor='facebook'>Facebook</label>
              <div className={Style.form_box_input_box}>
                <div className={Style.form_box_input_box_icon}>
                  <TiSocialFacebook/>
                </div>
                <input type='text' placeholder='http://rubenbalon'/>
              </div>
            </div>
            <div className={Style.form_box_input}>
              <label htmlFor='twitter'>Twitter</label>
              <div className={Style.form_box_input_box}>
                <div className={Style.form_box_input_box_icon}>
                  <TiSocialTwitter/>
                </div>
                <input type='text' placeholder='http://rubenbalon'/>
              </div>
            </div>
            <div className={Style.form_box_input}>
              <label htmlFor='instagram'>Instagram</label>
              <div className={Style.form_box_input_box}>
                <div className={Style.form_box_input_box_icon}>
                  <TiSocialInstagram/>
                </div>
                <input type='text' placeholder='http://rubenbalon'/>
              </div>
            </div>
          </div>
          <div className={Style.form_box_input}>
            <label htmlFor='wallet'>Wallet address</label>
            <div className={Style.form_box_input_box}>
              <div className={Style.form_box_input_box_icon}>
                <MdOutlineHttp/>
              </div>
              <input type='text'
              placeholder='0x41D8C26852Cb6fF8A66532aC38fcFA7956536121'/>
              <div className={Style.form_box_input_box_icon}>
                <MdOutlineContentCopy/>
              </div>
            </div>
          </div>
          <div className={Style.form_box_btn}>
            <Button btnName='Upload profile'
            handleClick={()=> {}}
            classStyle={Style.button}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form