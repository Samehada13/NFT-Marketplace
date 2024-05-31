import React, { useState, useEffect } from 'react';
import { MdVerified, MdVerifiedUser } from 'react-icons/md';

const ReviewList = ({ currentAccount, fetchReviewsForAddress }) => {
    const reviewsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [reviews, setReviews] = useState([]);

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview).reverse(); // Reversed array

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        if (currentAccount) {
            fetchReviews(currentAccount);
        }
    }, [currentAccount]);

    const fetchReviews = async (sellerAddress) => {
        try {
            console.log('Fetching reviews for address:', sellerAddress);
            const fetchedReviews = await fetchReviewsForAddress(sellerAddress);
            console.log('Fetched reviews:', fetchedReviews);
            setReviews(fetchedReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    return (
        <div className="review-list">
            <h2>Rating for the seller</h2>
            {reviews.length === 0 ? (
                <p className="no-ratings">No ratings yet...</p>
            ) : (
                <>
                    <ul>
                        {currentReviews.map((review, index) => (
                            <li key={index} className="review-box">
                                <div className="review-content">
                                    <div className="column">
                                        <p>
                                            <strong>Buyer:</strong> {`0x${index.toString().padStart(40, '0')}`}{' '}
                                            <MdVerifiedUser className="verified-user-icon" />
                                        </p>
                                        {/* Incrementing buyer */}
                                        <span>
                                            <strong>Review:</strong>
                                            <p>{review}</p>
                                        </span>
                                    </div>
                                    <MdVerified className="verified-icon" />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className="page-link">
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <style jsx>{`
                .review-list {
                    position: relative;
                    width: 80%;
                    margin: 0 auto;
                    margin-top: 10rem;
                    margin-bottom: 7rem;
                }

                .verified-icon {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    color: green;
                    font-size: 24px;
                }

                .verified-user-icon {
                    color: blue;
                    font-size: 20px;
                }

                ul {
                    list-style-type: none;
                    padding: 0;
                }

                .review-box {
                    position: relative;
                    margin-bottom: 20px;
                    padding: 10px;
                    border: 1px solid #eee;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                    transition: transform 0.3s ease;
                }

                .review-box:hover {
                    transform: scale(1.05);
                }

                .review-content {
                    display: flex;
                    justify-content: space-between;
                }

                .column {
                    width: calc(100% - 30px);
                }

                p {
                    margin: 5px 0;
                }

                .no-ratings {
                    text-align: center;
                    margin-top: 1rem;
                    font-size: 2.5rem;
                }

                strong {
                    font-weight: bold;
                }

                .pagination {
                    display: flex;
                    justify-content: center;
                    list-style: none;
                    padding: 0;
                }

                .pagination li {
                    margin-right: 5px;
                }

                .pagination button {
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background-color: #fff;
                    cursor: pointer;
                }

                .pagination button:hover {
                    background-color: #f0f0f0;
                }

                .pagination .active button {
                    background-color: #007bff;
                    color: #fff;
                }

                @media screen and (max-width: 35em) {
                    .review-list {
                        margin-top: 5rem;
                        margin-bottom: 3rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default ReviewList;
