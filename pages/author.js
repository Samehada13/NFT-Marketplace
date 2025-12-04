import React, { useState, useEffect, useContext, useRef } from 'react';
import { ethers } from 'ethers';
import Style from '../styles/author.module.css';
import { Banner, NFTCardTwo } from '../collectionPage/collectionIndex';
import { Brand, Title } from '../components/componentIndex';
import image from '../img';
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from '../authorPage/authorIndex';
import HeroSection from '../authorPage/HeroSection/HeroSection';
import RecentActivity from '../authorPage/RecentActivity/RecentActivity';
import Filter from '../components/Filter/Filter';
import FollowerTabCard from '../components/FollowerTab/FollowerTabCard/FollowerTabCard';
import { useRouter } from 'next/router';
import { getVolumeOfUser } from '../TopCreators/TopCreators';
import Scatter from '../TopCreators/ScatterPlot';
import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';
import ScatterPlot from '../TopCreators/ScatterPlot';
import ReviewList from './review';
import NFTReviewDialogConfirmation from './NFTReviewDialogConfirmation';

import { useTranslation } from 'react-i18next';
import { generateSampleNFTs } from '../utils/sampleData';
import NFTScatterChart from '../TopCreators/NFTScatterChart';
import AreaChart from '../components/AreaChart/AreaChart';

const author = ({ creators }) => {
  const [collectibles, setCollectibles] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);
  const [about, setAbout] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [seller, setSeller] = useState('');

  const {
    fetchMyNFTsOrListedNFTs,
    fetchNFTsByAddressFromURL,
    currentAccount,
    leaveSellerReview,
    tokenId,
    fetchNFTsWithBids,
  } = useContext(NFTMarketplaceContext);

  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);

  const router = useRouter();
  const [addressNFTs, setAddressNFTs] = useState([]);

  const getSellVolume = getVolumeOfUser(nfts);
  const totalSize = 24;
  const [loadingNFTs, setLoadingNFTs] = useState(true);
  const [chartData, setChartData] = useState([]);

  // Replace both useEffect hooks with this single one:
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const addressParam = urlSearchParams.get('address');

    const fetchData = async () => {
      setLoadingNFTs(true);
      try {
        let items = [];

        if (addressParam) {
          items = await fetchNFTsByAddressFromURL(addressParam);
          setAddressNFTs(items);
        } else if (currentAccount) {
          items = await fetchMyNFTsOrListedNFTs('fetchItemsListed');
        }

        // If we got data, use it; otherwise use sample data
        if (Array.isArray(items) && items.length > 0) {
          setNfts(items);
          setAddressNFTs(items);
        } else {
          // No data fetched, use sample data
          const sampleData = generateSampleNFTs(30);
          setNfts(sampleData);
          setAddressNFTs(sampleData);
        }
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        // On error, fall back to sample data
        const sampleData = generateSampleNFTs(30);
        setNfts(sampleData);
        setAddressNFTs(sampleData);
      } finally {
        setLoadingNFTs(false);
      }
    };

    fetchData();
  }, [router.search, currentAccount]);

  // Keep this separate useEffect for myNFTs
  useEffect(() => {
    const fetchMyNFTs = async () => {
      try {
        const items = await fetchMyNFTsOrListedNFTs('fetchMyNfts');
        if (Array.isArray(items) && items.length > 0) {
          setMyNFTs(items);
        } else {
          // Use sample data if no NFTs found
          const sampleData = generateSampleNFTs(10);
          setMyNFTs(sampleData);
        }
      } catch (error) {
        console.error('Error fetching my NFTs:', error);
        const sampleData = generateSampleNFTs(10);
        setMyNFTs(sampleData);
      }
    };

    if (currentAccount) {
      fetchMyNFTs();
    }
  }, [currentAccount]);

  const { t } = useTranslation();
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

  useEffect(() => {
    const { purchased, seller: sellerAddress } = router.query;
    if (purchased === 'success' && sellerAddress) {
      setSeller(sellerAddress); // Update seller state
      setOpenReviewDialog(true);
      // router.replace(router.pathname, router.pathname, { scroll: false });
    } else if (purchased === 'failure') {
      setOpenReviewDialog(false);
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

  const [nftsWithBids, setNftsWithBids] = useState([]);
  useEffect(() => {
    const fetchNFTsWithBidsBySeller = async () => {
      try {
        const items = await fetchNFTsWithBids();

        const nftsBySeller = items.filter(
          (item) => item.seller.toLowerCase() === currentAccount.toLowerCase()
        );

        setNftsWithBids(nftsBySeller);
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
        const nftsByBidder = items.filter(
          (item) =>
            item.currentBidder &&
            item.currentBidder.toLowerCase() === currentAccount.toLowerCase()
        );

        setNftsWithBidsBidder(nftsByBidder);
      } catch (error) {
        console.error('Error fetching NFTs with bids:', error);
      }
    };

    fetchNFTsWithBidsByBidder();
  }, [currentAccount, fetchNFTsWithBids]);

  // Calculate stats for hero section
  const userStats = {
    totalNFTs: nfts.length || 0,
    totalSales: nfts.filter(nft => nft.sold).length || 0,
    followers: 0, // TODO: Implement followers count
    collectionValue: nfts.reduce((acc, nft) => acc + (parseFloat(nft.price) || 0), 0).toFixed(2) || '0'
  };

  console.log("NFTs", nfts);

  return (
    <div className='bg-body' style={{ background: 'var(--bg-body)' }}>
      <NFTReviewDialogConfirmation
        handleClose={handleCloseReviewDialog}
        open={openReviewDialog}
        seller={seller}
        leaveSellerReview={leaveSellerReview}
        tokenId={tokenId}
      />

      {/* New Hero Section */}
      <HeroSection
        currentAccount={currentAccount}
        stats={userStats}
        isOwnProfile={!router.query.address || router.query.address === currentAccount}
      />

      {/* Navigation Tabs */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <AuthorTaps
          setCollectibles={setCollectibles}
          setCreated={setCreated}
          setLike={setLike}
          setFollower={setFollower}
          setFollowing={setFollowing}
          setAbout={setAbout}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Primary Content */}
          <div>
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
          </div>

          {/* Sidebar */}
          <div>
            {/* Analytics Section */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
              <AreaChart />
            </div>

            {/* Recent Activity Timeline */}
            <RecentActivity activities={[]} />
          </div>
        </div>
      </div>

      <Brand />
    </div>
  );
};

export default author;
