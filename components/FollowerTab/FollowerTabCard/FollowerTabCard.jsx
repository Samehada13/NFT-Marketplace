import React, { useState } from 'react';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import { TiUserAdd, TiTick } from 'react-icons/ti';
import image from '../../../img';

const FollowerTabCard = ({ i, el }) => {
  const [following, setFollowing] = useState(false);

  const toggleFollow = () => {
    setFollowing(!following);
  };

  return (
    <div className='relative w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300'>
      {/* Background Image with Overlay */}
      <div className='relative h-80 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 overflow-hidden'>
        <Image
          src={el.backgroundImage || image?.user1 || '/default-bg.jpg'}
          alt='Background'
          layout='fill'
          objectFit='cover'
          className='opacity-60'
        />

        {/* Dark Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent'></div>

        {/* Verified Badge */}
        <div className='absolute top-4 right-4 bg-violet-500 rounded-full p-1'>
          <MdVerified className='w-4 h-4 text-white' />
        </div>

        {/* Content Overlay */}
        <div className='absolute bottom-0 left-0 right-0 p-4'>
          {/* Profile Section */}
          <div className='flex items-center mb-3'>
            <div className='relative w-16 h-16'>
              <Image
                src={el.user || image?.user1 || '/default-user.png'}
                alt='Profile'
                width={64}
                height={64}
                className='rounded-full border-3 border-white shadow-sm object-cover'
              />
              <div className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
            </div>

            <div className='ml-4 flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                <h3 className='text-white font-bold text-lg truncate'>
                  {el.seller.slice(0, 8)}...{el.seller.slice(-4)}
                </h3>
              </div>
              <p className='text-gray-300 text-sm'>Digital Artist</p>
            </div>
          </div>

          {/* NFT Title */}
          <h2 className='text-white text-xl font-bold mb-3 truncate'>
            {el.title || 'Otherdeed for Otherside'}
          </h2>

          {/* Stats Bar */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10'>
            <div className='flex-shrink min-w-0'>
              <p className='text-gray-400 text-xs mb-1'>Floor price:</p>
              <div className='flex items-center gap-1.5 flex-wrap'>
                <span className='text-white font-bold text-lg'>
                  {el.price || '0.172'}
                </span>
                <span className='text-gray-400 text-xs'>MATIC</span>
                <span className='text-green-400 text-xs font-semibold'>
                  {el.change || '+72.1%'}
                </span>
              </div>
            </div>

            {/* Follow Button */}
            <button
              onClick={toggleFollow}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-full font-semibold text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 ${following
                  ? 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                  : 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-500/50'
                }`}
            >
              {following ? (
                <>
                  <TiTick className='w-4 h-4' />
                  Following
                </>
              ) : (
                <>
                  <TiUserAdd className='w-4 h-4' />
                  Follow
                </>
              )}
            </button>
          </div>

          {/* Volume Stats */}
          {el.total && (
            <div className='mt-3 text-center'>
              <p className='text-gray-400 text-xs'>Total Volume</p>
              <p className='text-white font-bold text-lg'>{el.total} MATIC</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowerTabCard;
