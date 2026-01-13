import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Brand, Category, Title } from '../components/componentIndex';
import NFTDetailsPage from '../NFTDetailsPage/NFTDetailsPage';

import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';

import { useTranslation } from 'react-i18next';

const NFTDetails = () => {
  const { currentAccount, placeBid, acceptBid, fetchBidsForNFT, currentNFT } = useContext(NFTMarketplaceContext);
  const router = useRouter();
  const { t } = useTranslation();

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    creator: ""
  });

  useEffect(() => {
    if (currentNFT) {
      // Handle StaticImageData objects for sample data
      const imageValue = typeof currentNFT.image === 'object' && currentNFT.image?.src
        ? currentNFT.image.src
        : currentNFT.image;

      setNft({ ...currentNFT, image: imageValue });
    } else {
      // No NFT data available (e.g., page refresh), redirect to search
      router.push('/searchPage');
    }
  }, [currentNFT, router]);

  return (
    <div>
      <NFTDetailsPage
        nft={nft}
        placeBid={placeBid}
        acceptBid={acceptBid}
        fetchBidsForNFT={fetchBidsForNFT}
      />
      <Brand />
    </div>
  );
};

export default NFTDetails;