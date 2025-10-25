import { useState, useContext, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import { CgMenuRight } from 'react-icons/cg';
import { MdClose } from 'react-icons/md';
import { Discover, HelpCenter, Notification, Profile } from './index';
import { Button, Error } from '../componentIndex';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { NFTMarketplaceContext } from '../../context/NFTMarketplaceContext';
import { Menu, Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import image from '../../img';
import logo from '../../public/GABR-Logo.png';
const NavBar = () => {
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );
  const { t } = useTranslation();

  const openNotification = () => {
    setNotification(!notification);
    setProfile(false);
  };

  const openProfile = () => {
    setProfile(!profile);
    setNotification(false);
  };

  return (
    <div className='w-full fixed top-0 left-0 right-0 z-50'>
      <nav className='bg-white shadow-sm'>
        <div className=' mx-auto px-4 sm:px-6'>
          <div className='flex justify-between items-center h-16'>
            {/* Left side - Logo and Desktop Menu */}
            <div className='flex items-center space-x-4'>
              {/* Logo */}
              <Link
                href='/'
                className='flex-shrink-0 flex items-center space-x-2'
              >
                <Image
                  src={logo}
                  alt='logo'
                  width={120}
                  height={40}
                />
              </Link>

              {/* Desktop Navigation */}
              <div className='hidden md:flex md:space-x-4'>
                {/* Discover Dropdown */}
                <Menu
                  as='div'
                  className='relative'
                >
                  {({ open }) => (
                    <>
                      <Menu.Button className='inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors'>
                        {t('navbar.discover')}
                        <ChevronDownIcon
                          className={`ml-1 h-4 w-4 transition-transform ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute left-0 mt-2 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
                          <div className='p-2'>
                            <Discover />
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>

                {/* Help Center Dropdown */}
                <Menu
                  as='div'
                  className='relative'
                >
                  {({ open }) => (
                    <>
                      <Menu.Button className='inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors'>
                        {t('navbar.helpCenter')}
                        <ChevronDownIcon
                          className={`ml-1 h-4 w-4 transition-transform ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute left-0 mt-2 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
                          <div className='p-2'>
                            <HelpCenter />
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>

            {/* Right side - Desktop */}
            <div className='hidden md:flex md:items-center md:space-x-4'>
              {/* Search Bar */}
              <div className='relative'>
                <input
                  type='text'
                  placeholder={t('navbar.searchPlaceholder')}
                  className='w-64 px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <BsSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              </div>

              {/* Connect/Mint Button 
               {/*<div>
                {currentAccount == '' ? (
                  <Button
                    btnName={t('navbar.connect')}
                    handleClick={() => connectWallet()}
                  />
                ) : (
                  <Button
                    btnName={t('navbar.mint')}
                    handleClick={() => router.push('/uploadNFT')}
                  />
                )}
              </div>*/}

              {/* Profile Dropdown */}
              <Menu
                as='div'
                className='relative'
              >
                <Menu.Button className='flex items-center'>
                  <span className='material-symbols-rounded'>
                    account_circle
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
                    <div className=''>
                      <Profile currentAccount={currentAccount} />
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* Language Switcher */}
              <div>
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className='md:hidden'>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none'
              >
                {mobileMenuOpen ? (
                  <MdClose className='h-6 w-6' />
                ) : (
                  <CgMenuRight className='h-6 w-6' />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition
          show={mobileMenuOpen}
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-150'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <div className='md:hidden border-t border-gray-200'>
            <div className='px-4 pt-4 pb-3 space-y-3'>
              {/* Search Bar Mobile */}
              <div className='relative'>
                <input
                  type='text'
                  placeholder={t('navbar.searchPlaceholder')}
                  className='w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <BsSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              </div>

              {/* Discover Disclosure */}
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex justify-between w-auto px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100'>
                      <span>{t('navbar.discover')}</span>
                      <ChevronDownIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel
                        className='absolute left-0 z-50 mt-1 bg-white rounded-md shadow-lg'
                        role='menu'
                      >
                        <div className='py-1'>
                          <Discover />
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>

              {/* Help Center Disclosure */}
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex justify-between w-auto px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100'>
                      <span>{t('navbar.helpCenter')}</span>
                      <ChevronDownIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel
                        className='absolute left-0 z-50 mt-1 w-48 bg-white rounded-md shadow-lg'
                        role='menu'
                      >
                        <div className='py-1'>
                          <HelpCenter />
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>

              {/* Profile Section Mobile */}
              <div className='border-t border-gray-200 pt-3 mt-3'>
                <div className='flex items-center'>
                  <div className='hidden md:block'>
                    <Image
                      src={image.user1}
                      alt='Profile'
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
                  </div>
                  <div className='flex-1'>
                    <Profile currentAccount={currentAccount} />
                  </div>
                </div>
              </div>

              {/* Connect/Mint Button Mobile */}
              <div className='px-4 py-2'>
                {currentAccount == '' ? (
                  <Button
                    btnName={t('navbar.connect')}
                    handleClick={() => {
                      connectWallet();
                      setMobileMenuOpen(false);
                    }}
                  />
                ) : (
                  <Button
                    btnName={t('navbar.mint')}
                    handleClick={() => {
                      router.push('/uploadNFT');
                      setMobileMenuOpen(false);
                    }}
                  />
                )}
              </div>

              {/* Language Switcher Mobile */}
              <div className='px-4 py-2'>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </Transition>
      </nav>

      {/* Error Modal */}
      {openError && <Error />}
    </div>
  );
};

export default NavBar;
