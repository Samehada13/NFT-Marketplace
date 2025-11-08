import Style from './AuthorNFTCardBox.module.css';
import nftImage1 from '../../img/nft-image-1.png';
import nftImage2 from '../../img/nft-image-2.png';
import nftImage3 from '../../img/nft-image-3.png';
import nftSale1 from '../../img/nftsale1.png';
import nftSale2 from '../../img/nftsale2.png';
import { NFTCardTwo } from '../../collectionPage/collectionIndex';
import FollowerTabCard from '../../components/FollowerTab/FollowerTabCard/FollowerTabCard';

const sampleNFTs = [
  {
    tokenId: 1,
    name: 'Digital Dream',
    description: 'A beautiful digital artwork',
    image: nftImage1,
    price: '0.15',
    category: 'Art',
    creator: '0x1234...5678',
    owner: '0x1234...5678',
    likes: 42,
    views: 128,
    createdAt: '2023-05-15T12:00:00Z',
  },
  {
    tokenId: 2,
    name: 'Crypto Punk',
    description: 'Rare crypto punk collectible',
    image: nftImage2,
    price: '1.25',
    category: 'Collectible',
    creator: '0x1234...5678',
    owner: '0x1234...5678',
    likes: 128,
    views: 512,
    createdAt: '2023-06-20T08:30:00Z',
  },
  {
    tokenId: 3,
    name: 'Metaverse Land',
    description: 'Virtual land parcel in the metaverse',
    image: nftImage3,
    price: '2.5',
    category: 'Virtual Land',
    creator: '0x1234...5678',
    owner: '0x1234...5678',
    likes: 89,
    views: 342,
    createdAt: '2023-07-10T15:45:00Z',
  },
  {
    tokenId: 4,
    name: 'Abstract Art',
    description: 'Modern abstract composition',
    image: nftSale1,
    price: '0.75',
    category: 'Art',
    creator: '0x1234...5678',
    owner: '0x1234...5678',
    likes: 56,
    views: 210,
    createdAt: '2023-08-05T09:15:00Z',
  },
  {
    tokenId: 5,
    name: 'Digital Portrait',
    description: 'Expressive digital character',
    image: nftSale2,
    price: '1.8',
    category: 'Portrait',
    creator: '0x1234...5678',
    owner: '0x1234...5678',
    likes: 92,
    views: 378,
    createdAt: '2023-08-12T14:20:00Z',
  },
];
console.log("NFTDatas", sampleNFTs)

const AuthorNFTCardBox = ({
  collectibles,
  created,
  like,
  follower,
  nfts = sampleNFTs,
  myNFTs = sampleNFTs,
  addressNFTs,
  nftsWithBids = sampleNFTs,
  nftsWithBidsBidder = sampleNFTs,
}) => {
  return (
    <div className={Style.authorNFTCardBox}>
      {collectibles && (
        <NFTCardTwo
          NFTData={nfts}
          NFTAddress={addressNFTs}
        />
      )}
      {created && <NFTCardTwo NFTData={myNFTs} />}
      {like && <NFTCardTwo NFTData={nftsWithBids} />}
      {follower && <NFTCardTwo NFTData={nftsWithBidsBidder} />}
      {/* {follower && (
            <div className={Style.authorNFTCardBox_box}>
                {followerArray.map((el, i)=> (
                    <FollowerTabCard i={i} el={el}/>
                ))}
            </div>
        )}
        {following && (
            <div className={Style.authorNFTCardBox_box}>
                {followingArray.map((el, i)=> (
                    <FollowerTabCard i={i} el={el}/>
                ))}
            </div>
        )} */}
    </div>
  );
};

export default AuthorNFTCardBox;
