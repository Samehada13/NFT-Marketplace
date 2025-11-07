import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import styles from './NFTCardTwo.module.css';

const NFTCard = ({ nft }) => {
    const [like, setLike] = useState(false);
    const [likeInc, setLikeInc] = useState(21);
    
    const likeNFT = (e) => {
        e.stopPropagation();
        if (!like) {
            setLike(true);
            setLikeInc(22);
        } else {
            setLike(false);
            setLikeInc(21);
        }
    };

    return (
        <div className={styles.nftCard}>
            <div className={styles.imageContainer}>
                <img
                    src={nft.image || 'https://via.placeholder.com/400'}
                    alt={nft.name}
                    className={styles.nftImage}
                />

                <div className={styles.gradientOverlay} />

                <div className={styles.cardInfo}>
                    <h3 className={styles.nftName}>
                        {nft.name || 'Unnamed NFT'}
                    </h3>

                    <div className={styles.priceSection}>
                        <div className={styles.priceContainer}>
                            <span className={styles.priceLabel}>Price</span>
                            <p className={styles.priceValue}>
                                <span className={styles.ethIcon}>◈</span>
                                {nft.price || '0.00'} ETH
                            </p>
                        </div>
                        
                        <div className={styles.likeCounter}>
                            <AiFillHeart className={styles.likeIcon} />
                            <span className={styles.likeCount}>{likeInc}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.likeButtonContainer}>
                    <button 
                        onClick={likeNFT}
                        className={styles.likeButton}
                    >
                        {like ? 
                            <AiFillHeart className={styles.likeIcon} /> : 
                            <AiOutlineHeart className={styles.likeIcon} />
                        }
                    </button>
                </div>

                {nft.category && (
                    <div className={styles.categoryBadge}>
                        <div className={styles.categoryContent}>
                            <span className={styles.categoryText}>
                                {nft.category}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const NFTCardTwo = ({ NFTData = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = NFTData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(NFTData.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!NFTData || NFTData.length === 0) {
        return (
            <div className={styles.noNFTs}>
                <div className={styles.emoji}>🎨</div>
                <p className={styles.noNFTsText}>No NFTs found</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.gridContainer}>
                {currentItems.map((nft, index) => (
                    <div key={`${nft.tokenId || index}-${nft.collection?.address || ''}`} className={styles.gridItem}>
                        <NFTCard nft={nft} />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
                    >
                        Previous
                    </button>

                    <div className={styles.pageNumbers}>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }
                            
                            if (i === 3 && currentPage < totalPages - 3) {
                                return <span key="ellipsis" className={styles.ellipsis}>...</span>;
                            }
                            if (i === 4 && currentPage < totalPages - 3) {
                                return (
                                    <button
                                        key={totalPages}
                                        onClick={() => paginate(totalPages)}
                                        className={`${styles.pageButton} ${currentPage === totalPages ? styles.active : ''}`}
                                    >
                                        {totalPages}
                                    </button>
                                );
                            }
                            
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => paginate(pageNum)}
                                    className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ''}`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ''}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default NFTCardTwo;