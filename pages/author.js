import React, {useState, useEffect, useContext, useRef} from 'react';
import { ethers } from 'ethers';
import Style from '../styles/author.module.css';
import {Banner, NFTCardTwo} from '../collectionPage/collectionIndex';
import {Brand, Title} from '../components/componentIndex';
import image from '../img';
import {AuthorProfileCard, AuthorTaps, AuthorNFTCardBox} from '../authorPage/authorIndex';
import FollowerTabCard from '../components/FollowerTab/FollowerTabCard/FollowerTabCard';
import { useRouter } from 'next/router';
import { useLocation } from 'react-router-dom';
import {getVolumeOfUser } from '../TopCreators/TopCreators'
import Scatter from '../TopCreators/ScatterPlot'
import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';
import ScatterPlot from '../TopCreators/ScatterPlot';
import ReviewList from './review';
import NFTReviewDialogConfirmation from './NFTReviewDialogConfirmation';

import { useTranslation } from 'react-i18next';

const author = ({creators}) => {
    const [collectibles, setCollectibles] = useState(true);
    const [created, setCreated] = useState(false);
    const [like, setLike] = useState(false);
    const [follower, setFollower] = useState(false);
    const [following, setFollowing] = useState(false);
    const [seller, setSeller] = useState('');
    
    const {
        fetchMyNFTsOrListedNFTs, 
        fetchNFTsByAddressFromURL, 
        currentAccount, 
        leaveSellerReview, 
        tokenId,
        fetchReviewsForAddress,
        fetchNFTsWithBids, 
    } = useContext(NFTMarketplaceContext);

    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);

    const [nfts, setNfts] = useState([]);
    const [myNFTs, setMyNFTs] = useState([]);

    const router = useRouter();
    const [addressNFTs, setAddressNFTs] = useState([]);

    const getSellVolume = getVolumeOfUser (nfts);
    const totalSize = 24;

    const getDateNPrice = nfts;
    console.log('Date and Price Data:', getDateNPrice);
    const [loadingNFTs, setLoadingNFTs] = useState(true);

    useEffect(() => {
      const urlSearchParams = new URLSearchParams(location.search);
      const addressParam = urlSearchParams.get('address');
  
      if (addressParam) {
          fetchNFTsByAddressFromURL(addressParam).then((items) => {
              setAddressNFTs(items);
            //   console.log('itesssssss', items);
          });
      }
  }, [router.search]);
  
  useEffect(() => {
      const urlSearchParams = new URLSearchParams(location.search);
      const addressParam = urlSearchParams.get('address');
  
      if (!addressParam) {
          fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
              setNfts(items);
            //   console.log(items);
          });
      }
  }, [router.search]);
  
  useEffect(() => {
      fetchMyNFTsOrListedNFTs("fetchMyNfts").then((items) => {
          setMyNFTs(items);
      });
  }, []);

  const { t } = useTranslation();
    const [openReviewDialog, setOpenReviewDialog] = useState(false);

    useEffect(() => {
        const { purchased, seller: sellerAddress } = router.query;
        console.log('Seller:', sellerAddress);
        if (purchased === 'success' && sellerAddress) {
            setSeller(sellerAddress); // Update seller state
            setOpenReviewDialog(true);
            // router.replace(router.pathname, router.pathname, { scroll: false });
        } else if (purchased === 'failure') {
            console.log('Purchase failed.');
            setOpenReviewDialog(false);
            // router.replace(router.pathname, router.pathname, { scroll: false });
        }
    }, [router.query]);

    const handleCloseReviewDialog = () => {
        setOpenReviewDialog(false);
    };

    useEffect(() => {
        const clearQueryParams = () => {
            window.history.replaceState({}, document.title, window.location.pathname);
        };
        clearQueryParams();

        return () => {
            window.removeEventListener('beforeunload', clearQueryParams);
        };
    }, []);

    // fetch nfts with active bids if you own the nft
    const [nftsWithBids, setNftsWithBids] = useState([]);
    useEffect(() => {
        const fetchNFTsWithBidsBySeller = async () => {
            try {
                
                const items = await fetchNFTsWithBids();
                console.log('Fetched NFTs with bids:', items);
                
                const nftsBySeller = items.filter(item => item.seller.toLowerCase() === currentAccount.toLowerCase());
    
                setNftsWithBids(nftsBySeller);
    
                console.log('xxxxFetched NFTs with bids by current account as seller:', nftsBySeller);
            } catch (error) {
                console.error('Error fetching NFTs with bids:', error);
            }
        };
    
        if (currentAccount) {
            fetchNFTsWithBidsBySeller();
        }
    }, [currentAccount]);
    
    //fetch nfts with active bids if current account connected is equal to the currenBidder
    const [nftsWithBidsBidder, setNftsWithBidsBidder] = useState([]);
    useEffect(() => {
        const fetchNFTsWithBidsByBidder = async () => {
            if (!currentAccount) return; 

            try {
                const items = await fetchNFTsWithBids();
                console.log('Fetched NFTs with bids:', items);

                const nftsByBidder = items.filter(item => 
                    item.currentBidder && item.currentBidder.toLowerCase() === currentAccount.toLowerCase()
                );

                setNftsWithBidsBidder(nftsByBidder);
                
                console.log('Fetched NFTs with bids by current account as currentBidder:', nftsByBidder);
            } catch (error) {
                console.error('Error fetching NFTs with bids:', error);
            }
        };

        fetchNFTsWithBidsByBidder();
    }, [currentAccount, fetchNFTsWithBids]);
 
    
  return (
    <div className={Style.author}>
        <NFTReviewDialogConfirmation 
            handleClose={handleCloseReviewDialog} 
            open={openReviewDialog} 
            seller={seller}
            leaveSellerReview={leaveSellerReview}
            setError={setError}
            setOpenError={setOpenError}
            tokenId={tokenId}
        />
        <Banner bannerImage={image.creatorbackground3}/>
        <AuthorProfileCard currentAccount={currentAccount}/>
        <AuthorTaps setCollectibles={setCollectibles}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}/>
        <AuthorNFTCardBox 
        collectibles={collectibles} 
        created={created} 
        like={like} 
        follower={follower} 
        following={following}
        nfts={nfts}
        myNFTs={myNFTs}
        addressNFTs={addressNFTs}
        nftsWithBids={nftsWithBids}
        nftsWithBidsBidder={nftsWithBidsBidder}
        />
        {/* <div className={Style.author_scatter}>
        </div> */}

        <div className={Style.leftContainer}>
            <Title heading={t('pages.author.title')}/>
            <div className={Style.author_box}>
                {currentAccount ? (
                    getSellVolume && getSellVolume.length > 0 ? (
                        <div>
                            <p style={{ fontSize: totalSize }}>{t('pages.author.volume')} <b>{getSellVolume[0].total} Matic📊</b></p>
                        </div>
                    ) : (
                        <p>{t('pages.author.error.paragraph1')} </p>
                    )
                ) : (
                    <p>{t('pages.author.error.paragraph2')} </p>
                )}
            </div>
            <div className={Style.author_scatter}>
                <ScatterPlot nfts={getDateNPrice} />
            </div>
        </div>
        <div className={Style.rightContainer}>
            <Title style={{ fontSize: '5px' }} heading='Feedback and Reviews' />
            <ReviewList 
                fetchReviewsForAddress={fetchReviewsForAddress} 
                currentAccount={currentAccount}
            />
        </div>
        
        <Brand/>
    </div>
  )
}

export default author

// Removed line 225         <Title heading={t('pages.author.title.earn')} />