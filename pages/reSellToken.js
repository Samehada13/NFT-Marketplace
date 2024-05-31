
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Style from '../styles/reSellToken.module.css';
import formStyle from '../accountPage/Form/Form.module.css';
import { Button } from '../components/componentIndex';

import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';

import { useTranslation } from 'react-i18next';

const ResellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;
    const { data } = await axios.get(tokenURI);

    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  const reSell = async () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      try {
        await createSale(tokenURI, price, true, id);
        router.push('/author');
      } catch (error) {
        console.log('Error while resell', error);
      }
    }

    setShowConfirmation(false);
  };

  const {t} = useTranslation();

  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>{t('pages.reSellToken.h1')}</h1>
        <div className={formStyle.form_box_input}>
          <label htmlFor='name'>{t('pages.reSellToken.price')}</label>
          <input
            type='number'
            min={0.5}
            placeholder={t('pages.reSellToken.sellYourNft')}
            className={formStyle.form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={Style.reSellToken_box_image}>
          {image && <Image src={image} alt='Sell NFT' width={400} height={400} />}
        </div>
        <div className={Style.reSellToken_box_btn}>
          <Button btnName={t('pages.reSellToken.sellNft')} handleClick={reSell} />
        </div>

        {showConfirmation && (
          <div className={Style.confirmationDialog}>
            <h2>{t('pages.reSellToken.areYouSure')}</h2>
            <p><b>{t('pages.reSellToken.sellingPrice')} {price} Matic</b></p>
            <div className={Style.buttonContainer}>
              <Button btnName={t('pages.reSellToken.yes')} handleClick={() => handleConfirmation(true)} />
              <Button btnName={t('pages.reSellToken.no')} handleClick={() => handleConfirmation(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResellToken;

