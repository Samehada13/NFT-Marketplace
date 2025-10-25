import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import image from '../../img';
import { Button } from '../../components/componentIndex';

const Brand = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className='bg-white px-4 '>
      <div className='relative bg-gradient-to-br rounded-tl-lg rounded-tr-lg from-violet-600 via-violet-500 to-purple-600 overflow-hidden'>
        {/* Decorative background elements */}
        <div className='absolute inset-0 '></div>

        <div className='mx-auto px-8 py-8 lg:py-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
            {/* Left Content */}
            <div className='relative z-10 space-y-8 text-center lg:text-left'>
              {/* Badge */}
              <div className='inline-flex items-center px-4 py-2 bg-amber-500 bg-opacity-20 backdrop-blur-sm border border-amber-400 border-opacity-30 rounded-full'>
                <span className='text-amber-300 text-sm font-semibold tracking-wide'>
                  NFT MARKETPLACE
                </span>
              </div>

              {/* Heading */}
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight'>
                {t('pages.home.brand.efc')}
              </h1>

              {/* Description */}
              <p className='text-lg sm:text-xl text-violet-100 leading-relaxed max-w-xl mx-auto lg:mx-0'>
                {t('pages.home.brand.acreweb')}
              </p>

              {/* Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                <button
                  onClick={() => router.push('/uploadNFT')}
                  className='group relative px-8 py-4 bg-amber-500 hover:bg-amber-400 text-violet-600 font-bold text-lg rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 overflow-hidden'
                >
                  <span className='relative z-10'>
                    {t('pages.home.brand.mint')}
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </button>

                <button
                  onClick={() => router.push('/searchPage')}
                  className='px-8 py-4 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm text-white font-bold text-lg rounded-xl border-2 border-white border-opacity-30 hover:border-amber-400 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300'
                >
                  {t('pages.home.brand.discover')}
                </button>
              </div>

              {/* Stats or Features */}
              <div className='flex flex-wrap gap-8 justify-center lg:justify-start pt-8'>
                <div className='text-center lg:text-left'>
                  <div className='text-3xl font-bold text-amber-400'>10K+</div>
                  <div className='text-violet-200 text-sm'>Artworks</div>
                </div>
                <div className='text-center lg:text-left'>
                  <div className='text-3xl font-bold text-amber-400'>5K+</div>
                  <div className='text-violet-200 text-sm'>Artists</div>
                </div>
                <div className='text-center lg:text-left'>
                  <div className='text-3xl font-bold text-amber-400'>2K+</div>
                  <div className='text-violet-200 text-sm'>Collections</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className='relative z-10 flex justify-center lg:justify-end'>
              <div className='relative w-full max-w-2xl'>
                {/* Decorative glow */}
                <div className='absolute inset-0 bg-amber-500 opacity-20 blur-3xl rounded-full transform scale-75'></div>

                {/* Image container */}
                <div className='relative rounded-3xl p-6 shadow-2xl border border-white border-opacity-20'>
                  <div className='relative rounded-2xl overflow-hidden'>
                    <Image
                      src={image.earn}
                      alt='NFT Marketplace'
                      width={800}
                      height={600}
                      className='w-full h-auto'
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
