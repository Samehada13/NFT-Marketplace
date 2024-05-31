// import React, {useState, useEffect, useContext} from 'react';
// import Image from 'next/image';
// import {BsImage} from 'react-icons/bs';
// import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
// import {MdVerified, MdTimer} from 'react-icons/md';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// import Style from './NFTCardTwo.module.css';
// import {LikeProfile} from '../../components/componentIndex';

// const NFTCardTwo = ({NFTData, NFTAddress}) => {
//     const [like, setLike] = useState(false);
//     const [likeInc, setLikeInc] = useState(21);

//     const likeNFT = ()=>{
//         if(!like){
//             setLike(true);
//             setLikeInc(23);
//         }else{
//             setLike(false);
//             setLikeInc(23 + 1);
//         }
//     }

//   return (
//     <div className={Style.nftCardTwo}>
//         {(NFTAddress && NFTAddress.length > 0) ? (
//             NFTAddress.map((el, i) => (
//                 <Link href={{ pathname: "/NFTDetails", query: el }} key={i + 1}>
//                     <div className={Style.nftCardTwo_box} key={i + 1}>
//                     <div className={Style.nftCardTwo_box_like}>
//                         <div className={Style.nftCardTwo_box_like_box}>
//                             <div className={Style.nftCardTwo_box_like_box_box}>
//                                 <BsImage className={Style.nftCardTwo_box_like_box_box_icon}/>
//                                 <p onClick={()=> likeNFT()}>
//                                     {like ? <AiOutlineHeart/> : <AiFillHeart/>}{""}
//                                     <span>{likeInc + 1}</span>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={Style.nftCardTwo_box_img}>
//                         <Image className={Style.nftCardTwo_box_img_img} src={el.image} 
//                         alt='NFT' width={500} height={500} objectFit='cover' 
//                         />
//                     </div>
//                     <div className={Style.nftCardTwo_box_info}>
//                         <div className={Style.nftCardTwo_box_info_left}>
//                             <LikeProfile/>
//                             <p>{el.name}</p>
//                         </div>
//                         <small>4{i + 1}</small>
//                     </div>
//                     <div className={Style.nftCardTwo_box_price}>
//                         <div className={Style.nftCardTwo_box_price_box}>
//                             <small>Current Bid</small>
//                             <p>{el.price} Matic</p>
//                         </div>
//                         <p className={Style.nftCardTwo_box_price_stock}>
//                             <span> Token #: {el.tokenId}</span>
//                         </p>
//                     </div>
//                 </div>
//                 </Link>
//             ))
//         ) : (
//             (NFTData && NFTData.length > 0) && (
//                 NFTData.map((el, i) => (
//                     <Link href={{ pathname: "/NFTDetails", query: el }} key={i + 1}>
//                         <div className={Style.nftCardTwo_box} key={i + 1}>
//                     <div className={Style.nftCardTwo_box_like}>
//                         <div className={Style.nftCardTwo_box_like_box}>
//                             <div className={Style.nftCardTwo_box_like_box_box}>
//                                 <BsImage className={Style.nftCardTwo_box_like_box_box_icon}/>
//                                 <p onClick={()=> likeNFT()}>
//                                     {like ? <AiOutlineHeart/> : <AiFillHeart/>}{""}
//                                     <span>{likeInc + 1}</span>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={Style.nftCardTwo_box_img}>
//                         <Image className={Style.nftCardTwo_box_img_img} src={el.image} 
//                         alt='NFT' width={500} height={500} objectFit='cover' 
//                         />
//                     </div>
//                     <div className={Style.nftCardTwo_box_info}>
//                         <div className={Style.nftCardTwo_box_info_left} title={el.name}>
//                         <LikeProfile />
//                         {el.name?.length > 6 ? (
//                             <p onClick={() => handleNameClick(el.name)}>
//                             {el.name.substring(0, 10) + "..."}
//                             </p>
//                         ) : (
//                             <p>{el.name}</p>
//                         )}
//                         </div>
//                         <span style={{ fontSize: '0.8rem', color: '#888' }}>1 stk</span>
//                     </div>
//                     <div className={Style.nftCardTwo_box_price}>
//                         <div className={Style.nftCardTwo_box_price_box}>
//                             <small>Current Bid</small>
//                             <p>{el.price}Matic</p>
//                         </div>
//                         <p className={Style.nftCardTwo_box_price_stock}>
//                             <span> Token #: {el.tokenId}</span>
//                         </p>
//                     </div>
//                 </div>
//                     </Link>
//                 ))
//             )
//         )}
        
//     </div>
//   )
// }

// export default NFTCardTwo


import React, { useState } from 'react';
import Image from 'next/image';
import { BsImage } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';

import Style from './NFTCardTwo.module.css';
import { LikeProfile } from '../../components/componentIndex';

const NFTCardTwo = ({ NFTData }) => {
    const itemsPerPage = 24;
    const [currentPage, setCurrentPage] = useState(1);
    const [like, setLike] = useState(false);
    const [likeInc, setLikeInc] = useState(21);

    const likeNFT = () => {
        if (!like) {
            setLike(true);
            setLikeInc(23);
        } else {
            setLike(false);
            setLikeInc(23 + 1);
        }
    };

    const totalPages = Math.ceil(NFTData.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const renderNFTItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, NFTData.length);

        return NFTData.slice(startIndex, endIndex).map((el, i) => (
            <Link href={{ pathname: '/NFTDetails', query: el }} key={i}>
                <div className={Style.nftCardTwo_box} key={i}>
                    <div className={Style.nftCardTwo_box_like}>
                        <div className={Style.nftCardTwo_box_like_box}>
                            <div className={Style.nftCardTwo_box_like_box_box}>
                                <BsImage className={Style.nftCardTwo_box_like_box_box_icon} />
                                <p onClick={likeNFT}>
                                    {like ? <AiOutlineHeart /> : <AiFillHeart />}
                                    {/* <span>{likeInc + 1}</span> */}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={Style.nftCardTwo_box_img}>
                        <Image
                            className={Style.nftCardTwo_box_img_img}
                            src={el.image}
                            alt="NFT"
                            width={500}
                            height={500}
                            objectFit="cover"
                        />
                    </div>
                    <div className={Style.nftCardTwo_box_info}>
                        <div className={Style.nftCardTwo_box_info_left} title={el.name}>
                            <LikeProfile />
                            {el.name?.length > 6 ? (
                                <p onClick={() => handleNameClick(el.name)}>{el.name.substring(0, 10) + '...'}</p>
                            ) : (
                                <p>{el.name}</p>
                            )}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}>1 stk</span>
                    </div>
                    <div className={Style.nftCardTwo_box_price}>
                        <div className={Style.nftCardTwo_box_price_box}>
                            <small>Current Bid</small>
                            <p>{el.price} Matic</p>
                        </div>
                        <p className={Style.nftCardTwo_box_price_stock}>
                            <span>Token #: {el.tokenId}</span>
                        </p>
                    </div>
                </div>
            </Link>
        ));
    };

    return (
        <div>
            <div className={Style.nftCardTwo}>
                {renderNFTItems()}
            </div>
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

export default NFTCardTwo;


