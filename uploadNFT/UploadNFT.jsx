import React, {useState, useEffect, useContext, useRef} from 'react';
import {MdOutlineHttp, MdOutlineAttachFile} from 'react-icons/md';
import {FaPercent} from 'react-icons/fa';
import {AiTwotonePropertySafety} from 'react-icons/ai';
import {TiTick} from 'react-icons/ti';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Style from './UploadNFT.module.css';
import formStyle from '../accountPage/Form/Form.module.css';
import images from '../img';
import {Button} from '../components/componentIndex';
import {DropZone} from '../uploadNFT/UploadNFTIndex';

import { useTranslation } from 'react-i18next';

const UploadNFT = ({uploadIPFS, createNFT}) => {
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const router = useRouter();
  const dropZoneRef = useRef(null);
  const [errorName, setErrorName] = useState("");
  const [errorRoyalties, setErrorRoyalties] = useState("");
  const [errorSize, setErrorSize] = useState("");
  const [errorPrice, setErrorPrice] = useState("");

  const { t } = useTranslation();

  const categoryArray = [
    {
      image: images.nftsale1,
      category: "Painting",
    },
    {
      image: images.nftsale2,
      category: "Drawing",
    },
    {
      image: images.nftsale3,
      category: "Sculpture",
    },
    {
      image: images.nftsale4,
      category: "Printmaking",
    },
    {
      image: images.nftsale8,
      category: "Photography",
    },
    {
      image: images.nftsale6,
      category: "Digital Art",
    },
  ]

  const handleConfirmation = async (confirmed) => {

    if (confirmed) {
      // Perform the upload action
      try {
        await createNFT(
          name,
          price,
          image,
          description,
          website,
          category,
          royalties,
          fileSize,
          properties,
          router
        );
      } catch (error) {
        console.log('Error while creating NFT', error);
      }
    }
    setShowConfirmation(false);
  };

  const handlePreviewClick = () => {
    // Scroll to the DropZone section if dropZoneRef is available
    if (dropZoneRef.current) {
      window.scrollTo({
        top: dropZoneRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (errorName) {
      const nameInput = document.getElementById("nftName");
      if (nameInput) {
        nameInput.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [errorName]);

  return (
    <div className={Style.upload}>
      <DropZone
      ref={dropZoneRef}
      title={t('pages.uploadNft.uploadNft.dropZone.title')}
      heading={t('pages.uploadNft.uploadNft.dropZone.heading')}
      subHeading={t('pages.uploadNft.uploadNft.dropZone.subHeading')}
      name={name}
      website={website}
      description={description}
      royalties={royalties}
      fileSize={fileSize}
      category={category}
      properties={properties}
      setImage={setImage}
      uploadIPFS={uploadIPFS}
      price={price}
      />

    <div className={Style.upload_box}>
      <div className={formStyle.form_box_input}>
          <label htmlFor="nft">{t('pages.uploadNft.uploadNft.nft.name')}</label>
          <input
            type="text"
            placeholder={t('pages.uploadNft.uploadNft.nft.placeholder')}
            className={formStyle.form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
            id="nftName"
          />
          {errorName && (
            <p style={{ color: 'red' }}>{errorName}</p>
          )}
        </div>
        <div className={formStyle.form_box_input}>
          <label htmlFor='website'>Website</label>
          <div className={formStyle.form_box_input_box}>
            <div className={formStyle.form_box_input_box_icon}>
              <MdOutlineHttp/>
            </div>
            <input type='text' placeholder='website'
            onChange={(e)=> setWebsite(e.target.value)}/>
          </div>
        </div>
        <p className={formStyle.upload_box_input_para}>
          {t('pages.uploadNft.uploadNft.nft.website.paragraph')}
        </p>
        <div className={formStyle.form_box_input}>
          <label htmlFor='description'>{t('pages.uploadNft.uploadNft.nft.description.label')}</label>
          <textarea name='' id='' cols={30} rows={6} 
          placeholder={t('pages.uploadNft.uploadNft.nft.description.placeholder')} 
          onChange={(e)=> setDescription(e.target.value)}></textarea>
          <p>
            {t('pages.uploadNft.uploadNft.nft.description.paragraph')}
          </p>
        </div>
        <div className={formStyle.form_box_input}>
          <label htmlFor='name'>Choose category</label>
          <p className={Style.upload_box_input_para}>
            Choose one category
          </p>
          <div className={Style.upload_box_slider_div}>
            {categoryArray.map((el, i)=>(
              <div className={`${Style.upload_box_slider} ${active == i+1 ? 
                Style.active : ""}`}
                key={i + 1} onClick={()=> (setActive(i + 1), setCategory(el.category))}>
                  <div className={Style.upload_box_slider_box}>
                    <div className={Style.upload_box_slider_box_img}>
                      <Image src={el.image}
                      alt='Background Image'
                      width={70}
                      height={70}
                      className={Style.upload_box_slider_box_img_img}/>
                    </div>
                    <div className={Style.upload_box_slider_box_img_icon}>
                      <TiTick/>
                    </div>
                  </div>
                  <p>{el.category}</p>
                </div>
            ))}
          </div>
        </div>
        <div className={formStyle.form_box_input_social}>
          <div className={formStyle.form_box_input}>
            <label htmlFor="royalties">{t('pages.uploadNft.uploadNft.nft.royalties.label')}</label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="text"
                placeholder={t('pages.uploadNft.uploadNft.nft.royalties.placeholder')}
                onChange={(e) => setRoyalties(e.target.value)}
                onBlur={() => {
                  if (isNaN(royalties)) {
                    setErrorRoyalties(t('pages.uploadNft.uploadNft.nft.royalties.error'));
                  } else {
                    setErrorRoyalties("");
                  }
                }}
              />
            </div>
            {errorRoyalties && (
              <p style={{ color: 'red' }}>{errorRoyalties}</p>
            )}
          </div>
          <div className={formStyle.form_box_input}>
            <label htmlFor="size">{t('pages.uploadNft.uploadNft.nft.size.label')}</label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <MdOutlineAttachFile />
              </div>
              <input
                type="text"
                placeholder={t('pages.uploadNft.uploadNft.nft.size.placeholder')}
                onChange={(e) => setFileSize(e.target.value)}
                onBlur={() => {
                  if (isNaN(fileSize)) {
                    setErrorSize(t('pages.uploadNft.uploadNft.nft.size.error'));
                  } else {
                    setErrorSize("");
                  }
                }}
              />
            </div>
            {errorSize && (
              <p style={{ color: 'red' }}>{errorSize}</p>
            )}
          </div>
          <div className={formStyle.form_box_input}>
            <label htmlFor='properties'>{t('pages.uploadNft.uploadNft.nft.properties.label')}</label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <AiTwotonePropertySafety/>
              </div>
              <input type='text' placeholder={t('pages.uploadNft.uploadNft.nft.properties.placeholder')}
              onChange={(e)=> setProperties(e.target.value)}/>
            </div>
          </div>
          <div className={formStyle.form_box_input}>
            <label htmlFor="price">{t('pages.uploadNft.uploadNft.nft.price.label')}</label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder={t('pages.uploadNft.uploadNft.nft.price.placeholder')}
                onChange={(e) => setPrice(e.target.value)}
                onBlur={() => {
                  // Check if Price is a number
                  if (isNaN(price)) {
                    setErrorPrice(t('pages.uploadNft.uploadNft.nft.price.error'));
                  } else {
                    setErrorPrice("");
                  }
                }}
              />
            </div>
            {errorPrice && (
              <p style={{ color: 'red' }}>{errorPrice}</p>
            )}
          </div>
        </div>
        <div className={Style.upload_box_btn}>
        <Button
            btnName={t('pages.uploadNft.uploadNft.nft.button.mint')}
            handleClick={() => {
              if (name.length <= 32) {
                setShowConfirmation(true);
              } else {
                setErrorName(t('pages.uploadNft.uploadNft.nft.name.error'));
              }
            }}
            classStyle={Style.upload_box_btn_style}
          />
          <Button
            btnName={t('pages.uploadNft.uploadNft.nft.button.preview')}
            handleClick={handlePreviewClick}
            classStyle={Style.upload_box_btn_style}
          />
        </div>

        {showConfirmation && (
          <div className={Style.confirmationDialog}>
            <h2>{t('pages.uploadNft.uploadNft.nft.dialogBox.h2')}</h2>
            <p>{t('pages.uploadNft.uploadNft.nft.dialogBox.name')} {name}</p>
            <p>{t('pages.uploadNft.uploadNft.nft.dialogBox.price')} {price} Matic</p>
            <div className={Style.buttonContainer}>
              <Button btnName={t('pages.uploadNft.uploadNft.nft.dialogBox.yes')} handleClick={() => handleConfirmation(true)} />
              <Button btnName={t('pages.uploadNft.uploadNft.nft.dialogBox.no')} handleClick={() => handleConfirmation(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadNFT