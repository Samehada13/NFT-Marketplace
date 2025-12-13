import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

const ContactUs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: 'How can I get in touch with the NFT Marketplace team for collaborations?',
      answer: 'We\'re always excited to hear from potential collaborators! For partnership inquiries, please reach out to our Partnerships team at the email provided above. We\'ll review your proposal and get back to you within 3-5 business days.'
    },
    {
      question: 'Where can I find information on NFT campaigns and releases?',
      answer: 'Stay updated on our latest NFT drops, campaigns, and exclusive releases by following our social media channels or subscribing to our newsletter. You can also reach out to our Press team for detailed information about upcoming releases and media kits.'
    },
    {
      question: 'How can I reach your customer support team?',
      answer: 'Our dedicated support team is available to help you with any technical issues, account questions, or general inquiries. Email our Support team using the contact information provided above, or visit our Help Center for immediate answers to common questions.'
    },
    {
      question: 'How do I list my NFTs on the marketplace?',
      answer: 'To list your NFTs, simply connect your wallet, navigate to the "Create" section, and follow the step-by-step guide to mint and list your digital assets. For technical assistance with the listing process, our Support team is here to help.'
    },
    {
      question: 'What blockchain networks do you support?',
      answer: 'We currently support Ethereum and Polygon networks for NFT transactions. Our platform is designed to provide seamless cross-chain compatibility, ensuring lower gas fees and faster transactions. Contact our Technical team for more information about supported networks.'
    },
    {
      question: 'How do I report a security issue or vulnerability?',
      answer: 'Security is our top priority. If you\'ve discovered a potential security vulnerability, please contact our Security team immediately at the Head Office email. We appreciate responsible disclosure and will respond to all security reports promptly.'
    }
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <div className='max-w-7xl mx-auto px-6 pt-24 pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          {/* Left Side - Contact Info */}
          <div>
            <p className='text-sm text-gray-600 mb-8 max-w-md leading-relaxed'>
              For any inquiries, collaborations, or just to say hello, we'd love to hear from you. Here's how we're best reached.
            </p>

            <h1 className='text-7xl md:text-8xl font-bold text-gray-900 mb-16 tracking-tight leading-none'>
              CONTACT US
            </h1>

            {/* Contact Sections */}
            <div className='space-y-12'>
              {/* Press */}
              <div>
                <h2 className='text-sm font-bold text-gray-900 mb-3 tracking-wide'>
                  PRESS
                </h2>
                <div className='text-sm text-gray-700 space-y-1'>
                  <p>INQUIRIES OR COVERAGE REQUESTS (PRESS OFFICE)</p>
                  <p>Carlos Greenapear, Managing Director</p>
                  <p>POLYGON ID: 456987 Flagship NFT Gallery</p>
                  <p className='mt-3'>
                    <a href='mailto:press@rlbnft.com' className='hover:text-purple-600 transition-colors'>
                      JUUN.J NFT
                    </a>
                  </p>
                  <p>
                    <a href='mailto:press@rlbnft.com' className='hover:text-purple-600 transition-colors'>
                      PRESS@RLBNFT.COM
                    </a>
                  </p>
                </div>
              </div>

              {/* Sales */}
              <div>
                <h2 className='text-sm font-bold text-gray-900 mb-3 tracking-wide'>
                  PARTNERSHIPS
                </h2>
                <div className='text-sm text-gray-700 space-y-1'>
                  <p>
                    <a href='mailto:partnerships@rlbnft.com' className='hover:text-purple-600 transition-colors'>
                      PARTNERSHIPS@RLBNFT.COM
                    </a>
                  </p>
                  <p className='mt-3'>COLLABORATION INQUIRIES</p>
                  <p>
                    <a href='mailto:collaborate@rlbnft.com' className='hover:text-purple-600 transition-colors'>
                      COLLABORATE@RLBNFT.COM
                    </a>
                  </p>
                </div>
              </div>

              {/* Head Office */}
              <div>
                <h2 className='text-sm font-bold text-gray-900 mb-3 tracking-wide'>
                  HEAD OFFICE
                </h2>
                <div className='text-sm text-gray-700 space-y-1'>
                  <p>
                    <a href='mailto:rlb_nft.support@gmail.com' className='hover:text-purple-600 transition-colors'>
                      RLB_NFT.SUPPORT@GMAIL.COM
                    </a>
                  </p>
                  <p className='mt-3'>JUUN.J MARKETPLACE DAY CORPORATION</p>
                  <p>Labo, Camarines Norte</p>
                  <p>Republic of Philippines</p>
                  <p className='mt-3'>
                    <a href='tel:+63907095520' className='hover:text-purple-600 transition-colors'>
                      +63 907 095 520
                    </a>
                  </p>
                </div>
              </div>

              {/* Support */}
              <div>
                <h2 className='text-sm font-bold text-gray-900 mb-3 tracking-wide'>
                  SUPPORT
                </h2>
                <div className='text-sm text-gray-700 space-y-1'>
                  <p>TECHNICAL ASSISTANCE & ACCOUNT HELP</p>
                  <p>
                    <a href='mailto:support@rlbnft.com' className='hover:text-purple-600 transition-colors'>
                      SUPPORT@RLBNFT.COM
                    </a>
                  </p>
                  <p className='mt-3'>COMMUNITY & SOCIAL</p>
                  <div className='flex gap-4 mt-2'>
                    <a
                      href='https://www.facebook.com/icreate.l'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-700 hover:text-purple-600 transition-colors text-xs font-medium'
                    >
                      FACEBOOK
                    </a>
                    <a
                      href='https://twitter.com/BLeyano'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-700 hover:text-purple-600 transition-colors text-xs font-medium'
                    >
                      TWITTER
                    </a>
                    <a
                      href='https://www.instagram.com/nftmplace/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-700 hover:text-purple-600 transition-colors text-xs font-medium'
                    >
                      INSTAGRAM
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Decorative Element */}
          <div className='hidden lg:flex items-center justify-center'>
            <div className='relative w-full h-[600px] bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl overflow-hidden'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-center space-y-4'>
                  <div className='w-32 h-32 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-16 h-16 text-white'
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
                  <h3 className='text-2xl font-bold text-gray-900'>Get in Touch</h3>
                  <p className='text-gray-600 max-w-xs mx-auto'>
                    We're here to help with any questions about our NFT marketplace
                  </p>
                </div>
              </div>

              {/* Decorative circles */}
              <div className='absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-50'></div>
              <div className='absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-50'></div>
              <div className='absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-50'></div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='bg-gray-50 py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-12 tracking-tight'>
            FREQUENTLY ASKED
            <br />
            QUESTIONS
          </h2>

          <div className='max-w-4xl space-y-2'>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className='bg-white border border-gray-200 overflow-hidden transition-all duration-300'
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className='w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left group'
                  aria-expanded={openFAQ === index}
                >
                  <span className='text-sm md:text-base font-medium text-gray-900 pr-8 group-hover:text-purple-600 transition-colors'>
                    {faq.question}
                  </span>
                  <div className='flex-shrink-0'>
                    {openFAQ === index ? (
                      <HiChevronUp className='w-6 h-6 text-gray-900 group-hover:text-purple-600 transition-colors' />
                    ) : (
                      <HiChevronDown className='w-6 h-6 text-gray-900 group-hover:text-purple-600 transition-colors' />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className='px-8 pb-6 pt-2'>
                    <p className='text-sm md:text-base text-gray-600 leading-relaxed'>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className='bg-white py-20'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <h3 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight'>
            Ready to Start Your NFT Journey?
          </h3>
          <p className='text-gray-600 mb-8 max-w-2xl mx-auto'>
            Explore our marketplace and discover unique digital assets from creators around the world.
          </p>
          <a
            href='/'
            className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-xl group'
          >
            EXPLORE MARKETPLACE
            <svg
              className='w-5 h-5 group-hover:translate-x-1 transition-transform'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </a>
        </div>
      </div>

      {/* CSS for smooth animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
