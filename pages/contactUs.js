import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='min-h-screen py-12 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-[var(--primary-text)] mb-4'>
            We'd love to hear from you!
          </h1>
          <p className='text-gray-500 text-lg'>
            Get in touch with us for any inquiries or support
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Left Side - Contact Information */}
          <div className='space-y-8'>
            <div className='rounded-2xl p-8 border border-white/20'>
              <div className='space-y-6'>
                <div className='pb-6 border-b border-white/20'>
                  <h3 className='text-xl font-semibold text-[var(--primary-color)] flex items-center'>
                    Address
                  </h3>
                  <p className='text-gray-500'>
                    Santa Cruz, Labo, Camarines Norte
                  </p>
                </div>

                <div className='pb-6 border-b border-white/20'>
                  <h3 className='text-xl font-semibold text-[var(--primary-color)] flex items-center'>
                    Email
                  </h3>
                  <a
                    href='mailto:rlb_nft.support@gmail.com'
                    className='text-purple-300 hover:text-purple-200 transition-colors break-all'
                  >
                    rlb_nft.support@gmail.com
                  </a>
                </div>

                <div className='pb-6 border-b border-white/20'>
                  <h3 className='text-xl font-semibold text-[var(--primary-color)] flex items-center'>
                    Phone Number
                  </h3>
                  <a
                    href='tel:+63907095520'
                    className='text-gray-500 hover:text-[var(--primary-text)] transition-colors'
                  >
                    +63 907 095 520
                  </a>
                </div>

                <div>
                  <h3 className='text-xl font-semibold text-[var(--primary-color)] flex items-center'>
                    Connect With Us
                  </h3>
                  <div className='flex gap-4 flex-wrap'>
                    <a
                      href='https://www.facebook.com/icreate.l'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-12 h-12 bg-white/10 hover:bg-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20'
                    >
                      <svg
                        className='w-6 h-6 text-[var(--primary-accent)]'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' />
                      </svg>
                    </a>
                    <a
                      href='https://twitter.com/BLeyano'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-12 h-12 bg-white/10 hover:bg-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20'
                    >
                      <svg
                        className='w-6 h-6 text-[var(--primary-accent)]'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' />
                      </svg>
                    </a>
                    <a
                      href='https://www.instagram.com/nftmplace/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-12 h-12 bg-white/10 hover:bg-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20'
                    >
                      <svg
                        className='w-6 h-6 text-[var(--primary-accent)]'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                      </svg>
                    </a>
                    <a
                      href='#'
                      className='w-12 h-12 bg-white/10 hover:bg-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20'
                    >
                      <svg
                        className='w-6 h-6 text-[var(--primary-accent)]'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                      </svg>
                    </a>
                    <a
                      href='https://www.youtube.com/@burnfayrYT'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-12 h-12 bg-white/10 hover:bg-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20'
                    >
                      <svg
                        className='w-6 h-6 text-[var(--primary-accent)]'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-black/5'>
            <form
              onSubmit={handleSubmit}
              className='space-y-6'
            >
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-[var(--primary-text)] mb-2'
                >
                  Full Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='John Doe'
                  className='w-full px-6 py-3 bg-white/5 border-2 border-[var(--primary-color)]/30 rounded-lg text-[var(--primary-text)] placeholder-gray-400 focus:outline-none focus:border-[var(--primary-color)]'
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-[var(--primary-text)] mb-2'
                >
                  Email Address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <svg
                      className='w-5 h-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='your.email@example.com'
                    className='w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-[var(--primary-color)]/30 rounded-lg text-[var(--primary-text)] placeholder-gray-400 focus:outline-none focus:border-[var(--primary-color)] '
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-[var(--primary-text)] mb-2'
                >
                  Your Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us what's on your mind..."
                  className='w-full px-4 py-3 bg-white/5 border-2 border-[var(--primary-color)]/30 rounded-lg text-[var(--primary-text)] placeholder-gray-400 focus:outline-none focus:border-[var(--primary-color)] resize-none'
                ></textarea>
              </div>

              <button
                type='submit'
                className='w-full bg-[var(--primary-color)] text-white hover:from-purple-700 font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-100'
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
