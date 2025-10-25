import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialInstagram,
  TiSocialYoutube,
} from 'react-icons/ti';
import { RiSendPlaneFill } from 'react-icons/ri';
import { Discover, HelpCenter } from '../NavBar/index';
import { useTranslation } from 'react-i18next';
import logo from '../../public/GABR-Logo.png';

const Footer = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const currentURL = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <footer className='bg-white px-4 pb-4'>
      <div className='mx-auto px-8 py-8 bg-gradient-to-bl from-purple-600 via-violet-500 to-violet-600  rounded-bl-lg rounded-br-lg '>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <div className='relative w-24 h-24'>
              <h1 className='text-white text-4xl font-semibold'>GABR</h1>
            </div>
            {/* <p className='text-white leading-relaxed text-sm'>
              {t('pages.home.footer.paragraph')}
            </p>*/}
          </div>

          {/* Discover Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-white mb-4'>
              {t('pages.home.footer.discover')}
            </h3>
            <div className='text-white'>
              <Discover />
            </div>
          </div>

          {/* Help Center Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-white mb-4'>
              {t('pages.home.footer.helpCenter')}
            </h3>
            <div className='text-white'>
              <HelpCenter />
            </div>
          </div>

          {/* Subscribe Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-white mb-4'>
              {t('pages.home.footer.subscribe')}
            </h3>

            {/* Email Input */}
            <div className='relative'>
              <input
                type='email'
                placeholder={t('pages.home.footer.eye')}
                className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all'
              />
              <button className='absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-500 hover:bg-amber-600 rounded-md transition-colors'>
                <RiSendPlaneFill className='text-white text-lg' />
              </button>
            </div>

            {/* Subscribe Info */}
            <p className='text-xs text-white leading-relaxed'>
              {t('pages.home.footer.statement')}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className='my-12 border-t border-gray-200'></div>

        {/* Bottom Section */}
        <div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
          {/* Social Media Icons */}
          <div className='flex items-center gap-3'>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 flex items-center justify-center text-white hover:text-violet-600 transition-colors'
            >
              <TiSocialFacebook className='text-2xl' />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${currentURL}`}
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 flex items-center justify-center text-white hover:text-violet-600 transition-colors'
            >
              <TiSocialTwitter className='text-2xl' />
            </a>
            <a
              href={`https://www.instagram.com/?url=${currentURL}`}
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 flex items-center justify-center text-white hover:text-violet-600 transition-colors'
            >
              <TiSocialInstagram className='text-2xl' />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?url=${currentURL}`}
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 flex items-center justify-center text-white hover:text-violet-600 transition-colors'
            >
              <TiSocialLinkedin className='text-2xl' />
            </a>
            <a
              href={`https://www.youtube.com/?url=${currentURL}`}
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 flex items-center justify-center text-white hover:text-violet-600 transition-colors'
            >
              <TiSocialYoutube className='text-2xl' />
            </a>
          </div>

          {/* Copyright */}
          <div className='text-center lg:text-left'>
            <p className='text-white text-sm'>
              &copy; 2024 GABR. All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div className='flex items-center gap-4 text-sm'>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                router.push('/privacy_policy');
              }}
              className='text-white hover:text-violet-600 transition-colors'
            >
              Privacy Policy
            </a>
            <span className='text-white'>|</span>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                router.push('/termsOfService');
              }}
              className='text-white hover:text-violet-600 transition-colors'
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
