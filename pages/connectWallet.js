import React, { useState, useEffect, useContext, useCallback } from 'react';
import Image from 'next/image';

import Style from '../styles/connectWallet.module.css';
import image from '../img';

import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';

import { useTranslation } from 'react-i18next';

const ConnectWallet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);
  const { t } = useTranslation();

  // Enhanced wallet data with features and descriptions
  const walletProviders = [
    {
      provider: image.provider1,
      name: 'MetaMask',
      tagline: "World's most popular wallet",
      features: [
        { icon: '🦊', text: 'Browser extension & mobile app' },
        { icon: '🔒', text: 'Bank-level security' },
        { icon: '⚡', text: 'Built-in token swap' }
      ],
      trustIndicator: '30M+ users worldwide',
      badge: 'Recommended',
      bgGradient: 'linear-gradient(135deg, #f6851b 0%, #e2761b 100%)'
    },
    {
      provider: image.provider2,
      name: 'WalletConnect',
      tagline: 'Connect from any wallet app',
      features: [
        { icon: '📱', text: '300+ wallet support' },
        { icon: '🔗', text: 'Universal connection' },
        { icon: '📸', text: 'QR code scan' }
      ],
      trustIndicator: 'Industry standard',
      badge: null,
      bgGradient: 'linear-gradient(135deg, #3b99fc 0%, #2d7dd2 100%)'
    },
    {
      provider: image.provider3,
      name: 'Coinbase Wallet',
      tagline: 'Trusted by millions',
      features: [
        { icon: '💰', text: 'Buy crypto built-in' },
        { icon: '👥', text: 'User-friendly interface' },
        { icon: '🏦', text: 'Backed by Coinbase' }
      ],
      trustIndicator: '10M+ downloads',
      badge: 'Popular',
      bgGradient: 'linear-gradient(135deg, #0052ff 0%, #0041cc 100%)'
    },
    {
      provider: image.provider4,
      name: 'Fortmatic',
      tagline: 'Email & password simplicity',
      features: [
        { icon: '✉️', text: 'No extension needed' },
        { icon: '🔐', text: 'Social login support' },
        { icon: '🎓', text: 'Beginner-friendly' }
      ],
      trustIndicator: 'Easy to start',
      badge: 'Best for beginners',
      bgGradient: 'linear-gradient(135deg, #6851ff 0%, #5641cc 100%)'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % walletProviders.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, walletProviders.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % walletProviders.length);
    setIsAutoPlaying(false);
  }, [walletProviders.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + walletProviders.length) % walletProviders.length);
    setIsAutoPlaying(false);
  }, [walletProviders.length]);

  const goToIndex = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
    } finally {
      setTimeout(() => setIsConnecting(false), 1000);
    }
  };

  const getCardClass = (index) => {
    if (index === currentIndex) return `${Style.walletCard} ${Style.active}`;
    if (index === (currentIndex - 1 + walletProviders.length) % walletProviders.length) {
      return `${Style.walletCard} ${Style.prev}`;
    }
    if (index === (currentIndex + 1) % walletProviders.length) {
      return `${Style.walletCard} ${Style.next}`;
    }
    return `${Style.walletCard} ${Style.hidden}`;
  };

  return (
    <div className={Style.connectWallet}>
      {/* Header Section */}
      <div className={Style.header}>
        <div className={Style.headerContent}>
          <div className={Style.headerText}>
            <h1>{t('pages.connectWallet.h1')}</h1>
            <p>{t('pages.connectWallet.paragraph')}</p>
          </div>
        </div>
        <div className={Style.stepIndicator}>Step 1 of 2</div>
      </div>

      {/* Carousel Container */}
      <div className={Style.carouselContainer}>
        {/* Main Carousel */}
        <div
          className={Style.carouselWrapper}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Wallet Cards */}
          <div className={Style.carouselTrack}>
            {walletProviders.map((wallet, index) => (
              <div
                key={index}
                className={getCardClass(index)}
                onClick={() => {
                  if (index === currentIndex) {
                    handleConnect();
                  } else if (index === (currentIndex - 1 + walletProviders.length) % walletProviders.length) {
                    goToPrevious();
                  } else if (index === (currentIndex + 1) % walletProviders.length) {
                    goToNext();
                  }
                }}
              >
                {/* Background Gradient */}
                <div className={Style.cardBackground} />

                {/* Visual Identity Zone */}
                <div className={Style.visualZone}>
                  <div className={Style.walletLogo}>
                    <Image
                      src={wallet.provider}
                      alt={wallet.name}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className={Style.walletInfo}>
                    <h3>{wallet.name}</h3>
                    <p className={Style.walletTagline}>{wallet.tagline}</p>
                    {wallet.badge && (
                      <div className={Style.badges}>
                        <span className={`${Style.badge} ${wallet.badge === 'Recommended' ? Style.recommended : ''}`}>
                          ⭐ {wallet.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Information Zone */}
                <div className={Style.infoZone}>
                  <ul className={Style.features}>
                    {wallet.features.map((feature, i) => (
                      <li key={i} className={Style.featureItem}>
                        <span className={Style.featureIcon}>{feature.icon}</span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={Style.trustIndicator}>
                    <strong>{wallet.trustIndicator}</strong>
                    <span>Secure & Reliable</span>
                  </div>
                </div>

                {/* Action Zone */}
                <div className={Style.actionZone}>
                  <button className={Style.connectButton} onClick={(e) => {
                    e.stopPropagation();
                    handleConnect();
                  }}>
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                  <div className={Style.quickNote}>
                    ⚡ Connect in under 30 seconds
                  </div>
                </div>

                {/* Loading State */}
                {isConnecting && index === currentIndex && (
                  <div className={Style.loading}>
                    <div className={Style.spinner} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className={Style.dotIndicators}>
          {walletProviders.map((_, index) => (
            <button
              key={index}
              className={`${Style.dot} ${index === currentIndex ? Style.active : ''}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to wallet ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
