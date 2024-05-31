import React, { useState } from 'react';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import { Button } from '../../components/componentIndex';

import Style from './NFTTabs.module.css';

import { useTranslation } from 'react-i18next';

const NFTTabs = ({ dataTab, acceptBid, currentAccount, nft }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);

  const handleAcceptBid = (bid) => {
    setSelectedBid(bid);
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      try {
        if (selectedBid) {
          await acceptBid(selectedBid.bidId);
        }
      } catch (error) {
        console.error("Error accepting bid", error);
        setError("Error accepting bid: " + error.message);
        setOpenError(true);
      }
    }

    setShowConfirmation(false);
    setSelectedBid(null);
  };

  const {t} = useTranslation();

  return (
    <div className={Style.NFTTabs}>
      {dataTab.map((bid) => (
        <div key={bid.bidId} className={Style.NFTTabs_box}>
          <div className={Style.NFTTabs_box_info}>
            <span>
              {t('pages.nftDetails.nftDetailsImg.nftTabs.bidder')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {bid.bidder.slice(0, 10)}... {bid.bidder.slice(-8)} <MdVerified />
            </span>
            <span>{t('pages.nftDetails.nftDetailsImg.nftTabs.amount')}&nbsp;&nbsp;&nbsp;{bid.amount} Matic</span>
          </div>
          {currentAccount === nft.seller.toLowerCase() && (
            <Button
              btnName={t('pages.nftDetails.nftDetailsImg.nftTabs.acceptBid')}
              handleClick={() => handleAcceptBid(bid)}
              classStyle={Style.button}
            />
          )}
        </div>
      ))}

      {showConfirmation && (
        <div className={Style.confirmationDialog}>
          <h2>{t('pages.nftDetails.nftDetailsImg.nftTabs.h2')}</h2>
          <p><b>{selectedBid.bidder}</b></p>
          <p><b>{selectedBid.amount} Matic</b></p>
          <div className={Style.buttonContainer}>
            <Button btnName={t('pages.nftDetails.nftDetailsImg.nftTabs.yes')} handleClick={() => handleConfirmation(true)} />
            <Button btnName={t('pages.nftDetails.nftDetailsImg.nftTabs.no')} handleClick={() => handleConfirmation(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTTabs;

