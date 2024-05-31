
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsImages } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';

import Style from './NFTCard.module.css';
import image from '../../img';

const NFTCard = ({ nftData }) => {
    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);
    const [like, setLike] = useState(false);

    const totalPages = Math.ceil(nftData.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const likeNft = () => {
        setLike(!like);
    };

    const truncateName = (name, maxLength) => {
        if (name.length <= maxLength) return name;
        return name.slice(0, maxLength - 3) + '...';
    };

    const renderNFTItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, nftData.length);
        const maxLength = 12;

        return nftData.slice(startIndex, endIndex).map((el, i) => (
            <Link href={{ pathname: '/NFTDetails', query: el }} key={i}>
                <div className={Style.NFTCard_box} key={i + 1}>
                    {/* Image */}
                    <div className={Style.NFTCard_box_img} style={{ overflow: 'hidden', maxHeight: '400px' }}>
                        <img
                            src={el.image}
                            alt="NFT Image"
                            className={Style.NFTCard_box_img_img}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                    {/* Update */}
                    <div className={Style.NFTCard_box_update}>
                        <div className={Style.NFTCard_box_update_left}>
                            <div className={Style.NFTCard_box_update_left_like} onClick={likeNft}>
                                {like ? <AiOutlineHeart /> : <AiFillHeart className={Style.NFTCard_box_update_left_like_icon} />}
                                22
                            </div>
                        </div>
                        <div className={Style.NFTCard_box_update_right}>
                            <div className={Style.NFTCard_box_update_right_info}>
                                <small>Category</small>
                                <p>{el.category}</p>
                            </div>
                        </div>
                    </div>
                    {/* Details */}
                    <div className={Style.NFTCard_box_update_details}>
                        {/* <div className={Style.NFTCard_box_update_details_price}>
                            Price and Seller
                        </div>
                        <div className={Style.NFTCard_box_update_details_category}>
                            <BsImages />
                        </div> */}
                        <div className={Style.NFTCard_box_update_details_price}>
                            <div className={Style.NFTCard_box_update_details_price_box}>
                            <h4>{truncateName(el.name, maxLength)}&nbsp;#{el.tokenId}</h4>
                                <h5></h5>
                                <div className={Style.NFTCard_box_update_details_price_box_box}>
                                    <div className={Style.NFTCard_box_update_details_price_box_bid}>
                                        <small>Current Bid</small>
                                        <p>{el.price} <span className={Style.smallText}>MATIC</span></p>
                                    </div>
                                    <div className={Style.NFTCard_box_update_details_price_box_stock}>
                                        <small>Seller: </small>
                                        <p>
                                            {el.seller.slice(0, 6)}{" "}...{" "}
                                            {el.seller.slice(-4)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style.NFTCard_box_update_details_category}>
                            <BsImages/>
                        </div>
                    </div>
                </div>
            </Link>
        ));
    };

    return (
        <div>
            <div className={Style.NFTCard}>{renderNFTItems()}</div>
            {totalPages > 1 && (
                <div className={Style.pagination}>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <span>{currentPage}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default NFTCard;


