import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
const NFTCard = ({ nft }) => {
    const [isHovered, setIsHovered] = useState(false);
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

    return (
        <div
            className='group relative bg-gray-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className='relative aspect-square overflow-hidden'>
                <img
                    src={nft.image || 'https://via.placeholder.com/400'}
                    alt={nft.name}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />

                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />

                {/* Top Section - Like Button */}
                <div className='absolute top-4 right-4 z-10'>
                    <button className='p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 group'>
                        <p onClick={likeNFT}>
                            {like ? <AiOutlineHeart color='text-red-500' /> : <AiFillHeart color='text-red-500'/>}
                        </p>
                    </button>
                </div>

                {/* Bottom Section - Info Overlay */}
                <div className='absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                    <div className='flex justify-between items-end gap-3'>
                        {/* Name and Price */}
                        <div className='flex-1 min-w-0'>
                            <h3 className='text-white font-bold text-lg mb-1 truncate drop-shadow-lg'>
                                {nft.name}
                            </h3>
                            <div className='flex items-baseline gap-2'>
                                <span className='text-gray-300 text-xs'>
                                    Price
                                </span>
                                <p className='text-white font-semibold text-base'>
                                    {nft.price} ETH
                                </p>
                            </div>
                        </div>

                        {/* Token/Category Badge */}
                        {nft.category && (
                            <div className='px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full'>
                                <span className='text-white text-xs font-medium'>
                                    {nft.category}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

const NFTCardTwo = ({ NFTData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = NFTData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(NFTData.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!NFTData || NFTData.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-20'>
                <div className='text-6xl mb-4'>🎨</div>
                <p className='text-gray-400 text-lg'>No NFTs found</p>
            </div>
        );
    }

    return (
        <div className='p-6'>
            {/* Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
                {currentItems.map((nft, index) => (
                    <NFTCard
                        key={index}
                        nft={nft}
                    />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className='flex items-center justify-center gap-2'>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
                    >
                        Previous
                    </button>

                    <div className='flex gap-2'>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                    currentPage === index + 1
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default NFTCardTwo;
