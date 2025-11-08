import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdVerified, MdShare, MdOutlineReportProblem } from 'react-icons/md';
import { FiCopy } from 'react-icons/fi';
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialInstagram,
} from 'react-icons/ti';
import { BsThreeDots } from 'react-icons/bs';
import { useRouter } from 'next/router';

import image from '../../img';
import { Button } from '../../components/componentIndex';

const AuthorProfileCard = ({ currentAccount }) => {
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const [currentURL, setCurrentURL] = useState('');

  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  const copyAddress = () => {
    const copyText = document.getElementById('myInput');
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  const openShare = () => {
    if (!share) {
      setShare(true);
      setReport(false);
    } else {
      setShare(false);
    }
  };

  const openReport = () => {
    if (!report) {
      setReport(true);
      setShare(false);
    } else {
      setReport(false);
    }
  };

  const shareOnSocialMedia = (socialMedia) => {
    const shareURL = encodeURIComponent(currentURL);
    switch (socialMedia) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${shareURL}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${shareURL}`,
          '_blank'
        );
        break;
      case 'youtube':
        alert('YouTube sharing is not supported due to platform restrictions.');
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${shareURL}`,
          '_blank'
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className='w-full z-[22222] mt-8'>
      <div className='w-4/5 flex rounded-lg gap-6'>
        {/* Profile Image */}
        <div className='w-1/2'>
          <Image
            src={image.nft_image_1}
            className='rounded-2xl'
            alt='NFT image'
            width={220}
            height={220}
          />
        </div>

        {/* Profile Info */}
        <div className='space-y-4'>
          <h2 className='text-3xl md:text-4xl font-bold flex items-center gap-2'>
            {currentAccount.slice(0, 8)} ... {currentAccount.slice(-6)}
            <MdVerified className='text-blue-500' />
          </h2>

          <div className='flex items-center gap-2'>
            <input
              type='text'
              value={address ? address : currentAccount}
              id='myInput'
              className='outline-none w-[85%] lg:w-[35%] text-base border-none bg-transparent'
              readOnly
            />
            <FiCopy
              onClick={copyAddress}
              className='text-xl cursor-pointer transition-all duration-300 hover:text-blue-600 hover:shadow-lg'
            />
          </div>

          <p className='text-base md:text-lg leading-snug w-full lg:w-[90%]'>
            Expressing emotions, shaping narratives, and painting worlds;
            artists create beauty, provoke thoughts, and captivate hearts with
            boundless creativity.
          </p>

          <div className='flex items-center gap-4 text-2xl px-0 md:px-8 lg:px-0'>
            <a
              href='#'
              onClick={() => shareOnSocialMedia('facebook')}
              className='rounded-full p-2 border transition-all duration-300 cursor-pointer text-[var(--primary-color)] border-[var(--primary-color)] hover:bg-white hover:text-[var(--primary-accent)] hover:border-[var(--primary-accent)]'
            >
              <TiSocialFacebook />
            </a>
            <a
              href='#'
              onClick={() => shareOnSocialMedia('twitter')}
              className='rounded-full p-2 border transition-all duration-300 cursor-pointer text-[var(--primary-color)] border-[var(--primary-color)] hover:bg-white hover:text-[var(--primary-accent)] hover:border-[var(--primary-accent)]'
            >
              <TiSocialTwitter />
            </a>
            <a
              href='#'
              onClick={() => shareOnSocialMedia('youtube')}
              className='rounded-full p-2 border transition-all duration-300 cursor-pointer text-[var(--primary-color)] border-[var(--primary-color)] hover:bg-white hover:text-[var(--primary-accent)] hover:border-[var(--primary-accent)]'
            >
              <TiSocialYoutube />
            </a>
            <a
              href='#'
              onClick={() => shareOnSocialMedia('linkedin')}
              className='rounded-full p-2 border transition-all duration-300 cursor-pointer text-[var(--primary-color)] border-[var(--primary-color)] hover:bg-white hover:text-[var(--primary-accent)] hover:border-[var(--primary-accent)]'
            >
              <TiSocialLinkedin />
            </a>
          </div>
        </div>

        {/* Share Button */}
        <div className='flex items-start self-start gap-8 relative justify-end col-span-1 lg:col-auto row-start-1 lg:row-auto'>
          <div className='relative'>
            <div className='p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700'>
              <MdShare
                onClick={openShare}
                className='text-3xl md:text-4xl cursor-pointer relative z-10 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300'
              />
            </div>

            {share && (
              <div 
                className='absolute p-2 w-60 shadow-lg rounded-2xl bg-white dark:bg-gray-800 right-0 lg:-right-4 top-12 z-50'
                onClick={(e) => e.stopPropagation()}
              >
              <a
                href='#'
                onClick={() => shareOnSocialMedia('facebook')}
              >
                <p className='flex items-center gap-4 cursor-pointer transition-all duration-300 py-2 px-2 hover:bg-blue-600 hover:text-white hover:rounded-sm'>
                  <span className='text-2xl'>
                    <TiSocialFacebook />
                  </span>
                  Facebook
                </p>
              </a>
              <a
                href='#'
                onClick={() => shareOnSocialMedia('twitter')}
              >
                <p className='flex items-center gap-4 cursor-pointer transition-all duration-300 py-2 px-2 hover:bg-blue-600 hover:text-white hover:rounded-sm'>
                  <span className='text-2xl'>
                    <TiSocialTwitter />
                  </span>
                  Twitter
                </p>
              </a>
              <a
                href='#'
                onClick={() => shareOnSocialMedia('linkedin')}
              >
                <p className='flex items-center gap-4 cursor-pointer transition-all duration-300 py-2 px-2 hover:bg-blue-600 hover:text-white hover:rounded-sm'>
                  <span className='text-2xl'>
                    <TiSocialLinkedin />
                  </span>
                  LinkedIn
                </p>
              </a>
              <a
                href='#'
                onClick={() => shareOnSocialMedia('youtube')}
              >
                <p className='flex items-center gap-4 cursor-pointer transition-all duration-300 py-2 px-2 hover:bg-blue-600 hover:text-white hover:rounded-sm'>
                  <span className='text-2xl'>
                    <TiSocialYoutube />
                  </span>
                  YouTube
                </p>
              </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
