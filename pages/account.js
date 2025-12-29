import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { FiCheckCircle, FiAlertCircle, FiShield, FiClock, FiDollarSign, FiUser, FiSettings, FiLock } from 'react-icons/fi';
import image from '../img';
import Form from '../accountPage/Form/Form';

const account = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  return (
    <div className='w-full p-6 bg-body'>
      <div className='w-full'>
        <div className='w-full text-left pb-6'>
          <h1 className='text-4xl font-semibold'>Edit Profile</h1>
        </div>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-6'>
        {/* Left Column - 2/3 */}
        <div className='w-full md:w-2/3 bg-main p-6 rounded-lg'>
        {/* Profile Image Section */}
        <div className='mb-8'>
          <div className='flex items-start gap-4'>
            <div className='relative flex-shrink-0'>
              <Image
                src={fileUrl ? URL.createObjectURL(fileUrl) : image.user3}
                alt='Account Profile'
                width={120}
                height={120}
                className='rounded-full object-cover'
              />
            </div>

            <div className='flex flex-col py-2 gap-2 items-start'>
              <button
                {...getRootProps()}
                className='px-4 py-2 bg-[var(--primary-color)] text-white text-sm rounded-md hover:bg-[var(--primary-color-hover)] transition-colors'
              >
                <input {...getInputProps()} />
                Upload new photo
              </button>
              <p className='text-xs text-gray-500'>
                We support PNGs, JPEGs and GIFs under 2MB
              </p>
            </div>
          </div>
        </div>
        {/* Form Component */}
          <div>
            <Form />
          </div>
        </div>

        {/* Right Column - 1/3 */}
        <div className='w-full md:w-1/3 space-y-6'>
          {/* Account Stats */}
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-4'>Account Stats</h3>
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600 dark:text-gray-300'>NFTs Owned</span>
                <span className='font-medium'>24</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600 dark:text-gray-300'>Collections</span>
                <span className='font-medium'>5</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600 dark:text-gray-300'>Total Sales</span>
                <span className='font-medium flex items-center'>
                  <FiDollarSign className='mr-1' /> 1.24 MATIC
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600 dark:text-gray-300'>Member Since</span>
                <span className='text-sm'>Jun 2023</span>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-4'>Verification</h3>
            <div className='space-y-3'>
              <div className='flex items-center'>
                <FiCheckCircle className='text-green-500 mr-2' />
                <span>Email Verified</span>
              </div>
              <div className='flex items-center'>
                <FiShield className='text-yellow-500 mr-2' />
                <span>Basic Verification</span>
              </div>
              <div className='flex items-center text-gray-400'>
                <FiClock className='mr-2' />
                <span>KYC Verification Pending</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-4'>Quick Actions</h3>
            <div className='space-y-3'>
              <button className='w-full flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
                <FiUser className='mr-2' />
                <span>Edit Profile</span>
              </button>
              <button className='w-full flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
                <FiLock className='mr-2' />
                <span>Security Settings</span>
              </button>
              <button className='w-full flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
                <FiSettings className='mr-2' />
                <span>Preferences</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default account;
