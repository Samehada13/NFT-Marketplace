import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

const StyledNFTReviewDialogConfirmation = styled.div`
  background-color: #f8f9fa;
  border: 2px solid var(--icons-bg-color);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 80%; /* Increase width */
  max-width: 600px; /* Set max-width */
  height: 74%; /* Increase height */
  max-height: 600px; /* Set max-height */

  h2 {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    color: #495057;
    margin-bottom: 15px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  textarea {
    width: 100%;
    height: 200px; /* Increase textarea height */
    margin-bottom: 15px;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
  }

  button {
    font-size: 1rem;
    padding: 0.8rem 1.2rem;
    margin: 5px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 2rem;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background-color: var(--icons-bg-color);
    }
  }

  button.btnNo {
    background-color: #dc3545;
    margin-left: 5px;
    &:hover {
      background-color: var(--icons-bg-color);
    }
  }

  .buttonContainer {
    display: flex;
    justify-content: center;
  }
`;

const NFTReviewDialogConfirmation = ({
  open,
  handleClose,
  handleReview,
  seller,
  leaveSellerReview,
  setError,
  setOpenError,
  tokenId,
  buyer,
}) => {
  const [review, setReview] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedOpen = localStorage.getItem('reviewDialogOpen');
    setIsOpen(storedOpen === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('reviewDialogOpen', isOpen);
  }, [isOpen]);

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  // const handleSubmit = () => {
  //   handleReview(review);
  //   handleClose();
  // };

  // const handleCancel = () => {
  //   handleClose();
  // };

  const handleSubmit = async () => {
    try {
      console.log('Submitting review...');
      const success = await leaveSellerReview(seller, review); // Use reviewer address instead of buyer address
      console.log('Review submission result:', success);
      if (success) {
        handleClose();
        setReview('');
      } else {
        setError('Error adding seller review');
        setOpenError(true);
      }
    } catch (error) {
      console.error('Error adding seller review', error);
      setError('Error adding seller review');
      setOpenError(true);
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <StyledNFTReviewDialogConfirmation
      style={{ display: open ? 'block' : 'none' }}
    >
      <div>
        <h2>Successfully purchased !</h2>
        <h2>Would you like to leave a review for the seller?</h2>
        <span>
          <p>
            <b>Seller address</b>
          </p>
          <p>{seller}</p>
        </span>
        <textarea
          value={review}
          onChange={handleChange}
          placeholder='Write your review...'
        />
        <div className='buttonContainer'>
          <button onClick={handleSubmit}>Submit</button>
          <button
            className='btnNo'
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </StyledNFTReviewDialogConfirmation>
  );
};

export default NFTReviewDialogConfirmation;
