import React from 'react';
import { MdVerified } from 'react-icons/md';

import Style from './NFTText.module.css';

import { useTranslation } from 'react-i18next';

const NFTText = ({ nft }) => {

    const { t } = useTranslation();

    return (
        <div className={Style.NFTText}>
            <div className={Style.NFTText_box}>
                <div className={Style.NFTText_box_description}>
                    <p>{t('pages.nftDetails.nftDetailsImg.description')}</p>
                </div>
                <div className={Style.NFTText_box_description_box}>
                    <p>
                        {nft.description}
                    </p>
                </div>
                <div className={Style.NFTText_box_details}>
                    <p>{t('pages.nftDetails.nftDetailsImg.details')}</p>
                </div>
                <div className={Style.NFTText_box_details_box}>
                    <div className={Style.NFTText_box_details_item}>
                        <small>{t('pages.nftDetails.nftDetailsImg.tokenId')}</small>
                        <p>{nft.tokenId}</p>
                    </div>

                    <div className={Style.NFTText_box_details_item}>
                        <small>{t('pages.nftDetails.nftDetailsImg.category')}</small>
                        <p>{nft.category}</p>
                    </div>

                    <div className={Style.NFTText_box_details_item}>
                        <small>{t('pages.nftDetails.nftDetailsImg.royalties')}</small>
                        <p>{nft.royalties} %</p>
                    </div>

                    <div className={Style.NFTText_box_details_item}>
                        <small>{t('pages.nftDetails.nftDetailsImg.fileSize')}</small>
                        <p>{nft.fileSize} MB</p>
                    </div>

                    <div className={Style.NFTText_box_details_item}>
                        <small>{t('pages.nftDetails.nftDetailsImg.properties')}</small>
                        <p>{nft.properties}</p>
                    </div>

                    <div className={Style.NFTText_box_details_item}>
                        <small>{t('pages.nftDetails.nftDetailsImg.website')}</small>
                        <p>{nft.website}</p>
                    </div>

                    <div className={Style.NFTText_box_details_item}>
                        <small>{t('pages.nftDetails.nftDetailsImg.sellerAddress')}</small>
                        <p>{nft.seller}</p>
                    </div>

                    <div className={Style.NFTText_box_details_item}>
                        <small>Creator Address</small>
                        <p>{nft.creator} <MdVerified /></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFTText
