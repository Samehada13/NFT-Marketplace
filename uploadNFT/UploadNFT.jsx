// React & Next.js Imports
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Icons
import { MdOutlineHttp, MdOutlineAttachFile } from 'react-icons/md';
import { FaPercent } from 'react-icons/fa';
import { AiTwotonePropertySafety } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';

// i18n
import { useTranslation } from 'react-i18next';

// Styles
import Style from './UploadNFT.module.css';
import formStyle from '../accountPage/Form/Form.module.css';

// Assets
import images from '../img';

// Components
import { Button } from '../components/componentIndex';
import { DropZone } from '../uploadNFT/UploadNFTIndex';

const UploadNFT = ({ uploadIPFS, createNFT }) => {
  // Router & Refs
  const router = useRouter();
  const dropZoneRef = useRef(null);
  const { t } = useTranslation();

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [properties, setProperties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [category, setCategory] = useState(0);
  const [active, setActive] = useState(0);
  const [image, setImage] = useState(null);

  // UI State
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Error States
  const [errorName, setErrorName] = useState("");
  const [errorPrice, setErrorPrice] = useState("");
  const [errorSize, setErrorSize] = useState("");
  const [errorRoyalties, setErrorRoyalties] = useState("");

  // Category Data
  const categoryArray = [
    { image: images.nftsale1, category: "Painting" },
    { image: images.nftsale2, category: "Drawing" },
    { image: images.nftsale3, category: "Sculpture" },
    { image: images.nftsale4, category: "Printmaking" },
    { image: images.nftsale8, category: "Photography" },
    { image: images.nftsale6, category: "Digital Art" },
  ];

  // Event Handlers
  const handleConfirmation = async (confirmed) => {
    if (!confirmed) {
      setShowConfirmation(false);
      return;
    }

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
      console.error('Error while creating NFT', error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const handlePreviewClick = () => {
    if (!dropZoneRef.current) return;

    window.scrollTo({
      top: dropZoneRef.current.offsetTop,
      behavior: 'smooth',
    });
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
        {/* NFT Name Input */}
        <div className={formStyle.form_box_input}>
          <label htmlFor="nft">
            {t('pages.uploadNft.uploadNft.nft.name')}
          </label>
          <input
            type="text"
            placeholder={t('pages.uploadNft.uploadNft.nft.placeholder')}
            className={formStyle.form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
            id="nftName"
          />
          {errorName && <p className={Style.error}>{errorName}</p>}
        </div>
        {/* Website Input */}
        <div className={formStyle.form_box_input}>
          <label htmlFor='website'>
            {t('pages.uploadNft.uploadNft.nft.website.label', 'Website')}
          </label>
          <div className={formStyle.form_box_input_box}>
            <div className={formStyle.form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>
            <input
              type='text'
              placeholder='website'
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <p className={formStyle.upload_box_input_para}>
            {t('pages.uploadNft.uploadNft.nft.website.paragraph')}
          </p>
        </div>
        {/* Description Textarea */}
        <div className={formStyle.form_box_input}>
          <label htmlFor='description'>
            {t('pages.uploadNft.uploadNft.nft.description.label')}
          </label>
          <textarea
            className="outline-2 outline-[var(--primary-color)]"
            name='description'
            id='description'
            cols={30}
            rows={6}
            placeholder={t('pages.uploadNft.uploadNft.nft.description.placeholder')}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>{t('pages.uploadNft.uploadNft.nft.description.paragraph')}</p>
        </div>
        {/* Category Selection */}
        <div className={formStyle.form_box_input}>
          <label>Choose category</label>
          <p className={Style.upload_box_input_para}>Choose one category</p>
          <div className={Style.upload_box_slider_div}>
            {categoryArray.map((el, i) => (
              <div
                key={i}
                className={`${Style.upload_box_slider} ${active === i + 1 ? Style.active : ""}`}
                onClick={() => {
                  setActive(i + 1);
                  setCategory(el.category);
                }}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <Image
                      src={el.image}
                      alt={el.category}
                      width={70}
                      height={70}
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>
                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p>{el.category}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Form Inputs Group */}
        <div className={formStyle.form_box_input_social}>
          {/* Royalties Input */}
          <div className={formStyle.form_box_input}>
            <label htmlFor="royalties">
              {t('pages.uploadNft.uploadNft.nft.royalties.label')}
            </label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="text"
                placeholder={t('pages.uploadNft.uploadNft.nft.royalties.placeholder')}
                value={royalties}
                onChange={(e) => setRoyalties(e.target.value)}
                onBlur={() => {
                  setErrorRoyalties(isNaN(royalties)
                    ? t('pages.uploadNft.uploadNft.nft.royalties.error')
                    : ""
                  );
                }}
              />
            </div>
            {errorRoyalties && <p className={Style.error}>{errorRoyalties}</p>}
          </div>

          {/* File Size Input */}
          <div className={formStyle.form_box_input}>
            <label htmlFor="size">
              {t('pages.uploadNft.uploadNft.nft.size.label')}
            </label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <MdOutlineAttachFile />
              </div>
              <input
                type="text"
                placeholder={t('pages.uploadNft.uploadNft.nft.size.placeholder')}
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                onBlur={() => {
                  setErrorSize(isNaN(fileSize)
                    ? t('pages.uploadNft.uploadNft.nft.size.error')
                    : ""
                  );
                }}
              />
            </div>
            {errorSize && <p className={Style.error}>{errorSize}</p>}
          </div>

          {/* Properties Input */}
          <div className={formStyle.form_box_input}>
            <label htmlFor='properties'>
              {t('pages.uploadNft.uploadNft.nft.properties.label')}
            </label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type='text'
                placeholder={t('pages.uploadNft.uploadNft.nft.properties.placeholder')}
                value={properties}
                onChange={(e) => setProperties(e.target.value)}
              />
            </div>
          </div>

          {/* Price Input */}
          <div className={formStyle.form_box_input}>
            <label htmlFor="price">
              {t('pages.uploadNft.uploadNft.nft.price.label')}
            </label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder={t('pages.uploadNft.uploadNft.nft.price.placeholder')}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onBlur={() => {
                  setErrorPrice(isNaN(price)
                    ? t('pages.uploadNft.uploadNft.nft.price.error')
                    : ""
                  );
                }}
              />
            </div>
            {errorPrice && <p className={Style.error}>{errorPrice}</p>}
          </div>
        </div>
        {/* Action Buttons */}
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

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className={Style.confirmationDialog}>
            <h2>{t('pages.uploadNft.uploadNft.nft.dialogBox.h2')}</h2>
            <p>
              {t('pages.uploadNft.uploadNft.nft.dialogBox.name')} {name}
            </p>
            <p>
              {t('pages.uploadNft.uploadNft.nft.dialogBox.price')} {price} Matic
            </p>
            <div className={Style.buttonContainer}>
              <Button
                btnName={t('pages.uploadNft.uploadNft.nft.dialogBox.yes')}
                handleClick={() => handleConfirmation(true)}
              />
              <Button
                btnName={t('pages.uploadNft.uploadNft.nft.dialogBox.no')}
                handleClick={() => handleConfirmation(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadNFT;