import { FaUserAlt, FaRegImage, FaUserEdit } from 'react-icons/fa';
import { MdHelpCenter } from 'react-icons/md';
import Link from 'next/link';
import { MdVerified } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';
import { Fragment } from 'react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';

const Profile = ({ currentAccount }) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      icon: (
        <span className='material-symbol material-symbol--md material-symbol-filled'>
          person
        </span>
      ),
      text: t('navbar.profile.creator.myProfile'),
      href: '/author',
    },
    {
      icon: (
        <span className='material-symbol material-symbol--md material-symbol-filled '>
          image
        </span>
      ),
      text: t('navbar.profile.creator.myNfts'),
      href: '/author',
    },
    {
      icon: (
        <span className='material-symbol material-symbol--md'>person_edit</span>
      ),
      text: t('navbar.profile.creator.editProfile'),
      href: '/account',
    },
    { type: 'divider' },
    {
      icon: <span className='material-symbol material-symbol--md'>help</span>,
      text: t('navbar.profile.creator.help'),
      href: '/contactUs',
    },
    {
      icon: <span className='material-symbol material-symbol--md'>info</span>,
      text: t('navbar.profile.creator.aboutUs'),
      href: '/aboutUs',
    },
  ];

  return (
    <div className='w-64'>
      <div className='flex flex-row items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700'>
        <span
          className='material-symbols-rounded'
          style={{ fontSize: '40px', width: '40px', height: '40px' }}
        >
          account_circle
        </span>
        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
            {t('navbar.profile.creator.paragraph')}
          </p>
          <div className='flex items-center gap-1'>
            <span className='text-xs text-gray-500 dark:text-gray-400 truncate'>
              {currentAccount.slice(0, 8)}...{currentAccount.slice(-6)}
            </span>
            <MdVerified className='ml-1 w-4 h-4 flex-shrink-0' />
          </div>
        </div>
      </div>

      <div className='p-2'>
        {menuItems.map((item, index) => (
          <Fragment key={index}>
            {item.type === 'divider' ? (
              <div className='border-t border-gray-200 my-1' />
            ) : (
              <Link
                href={item.href}
                className='menu-item'
              >
                <span className='flex items-center rounded-md hover:bg-indigo-100 px-4 py-2 text-sm h-[40px] space-x-3 text-gray-700'>
                  <span className='flex items-center justify-center'>
                    {item.icon}
                  </span>
                  <span className='text-base font-medium'>{item.text}</span>
                </span>
              </Link>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Profile;
