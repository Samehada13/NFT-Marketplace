import { useState } from 'react';
import Image from 'next/image';
import { MdVerified, MdShare } from 'react-icons/md';
import { FiCopy } from 'react-icons/fi';
import {
    TiSocialFacebook,
    TiSocialTwitter,
    TiSocialLinkedin,
    TiSocialInstagram,
} from 'react-icons/ti';
import {
    HiOutlineCollection,
    HiOutlineCurrencyDollar,
    HiOutlineUsers,
    HiOutlineTrendingUp,
} from 'react-icons/hi';
import image from '../../img';
import StatCard from '../components/StatCard';
import styles from './HeroSection.module.css';

const HeroSection = ({
    currentAccount,
    stats = {},
    isOwnProfile = false
}) => {
    const [share, setShare] = useState(false);

    const copyAddress = () => {
        navigator.clipboard.writeText(currentAccount);
        // TODO: Show toast notification
        console.log('Address copied!');
    };

    const shareOnSocialMedia = (platform) => {
        const shareURL = encodeURIComponent(window.location.href);
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareURL}`,
            twitter: `https://twitter.com/intent/tweet?url=${shareURL}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareURL}`,
        };

        if (urls[platform]) {
            window.open(urls[platform], '_blank');
        }
        setShare(false);
    };

    return (
        <section className={styles.heroSection}>
            {/* Gradient Background */}
            <div className={styles.heroBanner} />

            {/* Content Container */}
            <div className={styles.heroContent}>
                {/* Profile Info */}
                <div className={styles.profileSection}>
                    {/* Profile Picture */}
                    <div className={styles.profilePictureWrapper}>
                        <Image
                            src={image.user1}
                            alt="Profile"
                            width={200}
                            height={200}
                            className={styles.profilePicture}
                        />
                        <div className={styles.verifiedBadge}>
                            <MdVerified />
                        </div>
                    </div>

                    {/* User Details */}
                    <div className={styles.userDetails}>
                        <h1 className={styles.username}>
                            {currentAccount ? `${currentAccount.slice(0, 8)}...${currentAccount.slice(-6)}` : 'Connect Wallet'}
                            <MdVerified className={styles.verifiedIcon} />
                        </h1>

                        {/* Wallet Address */}
                        <div className={styles.walletAddress}>
                            <input
                                type="text"
                                value={currentAccount || 'No wallet connected'}
                                placeholder="Connect your wallet to view address"
                                id="walletInput"
                                className={styles.addressInput}
                                readOnly
                            />
                            <button onClick={copyAddress} className={styles.copyButton} aria-label="Copy address">
                                <FiCopy />
                            </button>
                        </div>

                        {/* Bio */}
                        <p className={styles.bio}>
                            Expressing emotions, shaping narratives, and painting worlds;
                            artists create beauty, provoke thoughts, and captivate hearts with
                            boundless creativity.
                        </p>

                        {/* Social Links */}
                        <div className={styles.socialLinks}>
                            <button
                                onClick={() => shareOnSocialMedia('facebook')}
                                className={styles.socialButton}
                                aria-label="Share on Facebook"
                            >
                                <TiSocialFacebook />
                            </button>
                            <button
                                onClick={() => shareOnSocialMedia('twitter')}
                                className={styles.socialButton}
                                aria-label="Share on Twitter"
                            >
                                <TiSocialTwitter />
                            </button>
                            <button
                                onClick={() => shareOnSocialMedia('linkedin')}
                                className={styles.socialButton}
                                aria-label="Share on LinkedIn"
                            >
                                <TiSocialLinkedin />
                            </button>
                            <button
                                className={styles.socialButton}
                                aria-label="Instagram"
                            >
                                <TiSocialInstagram />
                            </button>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className={styles.quickActions}>
                        {!isOwnProfile && (
                            <button className={`${styles.actionButton} ${styles.primary}`}>
                                Follow
                            </button>
                        )}
                        <button
                            className={`${styles.actionButton} ${styles.secondary}`}
                            onClick={() => setShare(!share)}
                        >
                            <MdShare /> Share
                        </button>
                        {/*{isOwnProfile && (
                            <button className={`${styles.actionButton} ${styles.secondary}`}>
                                Edit Profile
                            </button>
                        )}*/}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <StatCard
                        title="Total NFTs"
                        value={stats.totalNFTs || 0}
                        icon={HiOutlineCollection}
                        gradient="blue"
                    />
                    <StatCard
                        title="Total Sales"
                        value={stats.totalSales || 0}
                        icon={HiOutlineCurrencyDollar}
                        gradient="green"
                    />
                    <StatCard
                        title="Followers"
                        value={stats.followers || 0}
                        icon={HiOutlineUsers}
                        gradient="purple"
                    />
                    <StatCard
                        title="Total Value"
                        value={`${stats.collectionValue || '0'} Ξ`}
                        icon={HiOutlineTrendingUp}
                        gradient="orange"
                    />
                </div>
            </div>

            {/* Share Dropdown */}
            {share && (
                <div className={styles.shareDropdown} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => shareOnSocialMedia('facebook')} className={styles.shareOption}>
                        <TiSocialFacebook /> Facebook
                    </button>
                    <button onClick={() => shareOnSocialMedia('twitter')} className={styles.shareOption}>
                        <TiSocialTwitter /> Twitter
                    </button>
                    <button onClick={() => shareOnSocialMedia('linkedin')} className={styles.shareOption}>
                        <TiSocialLinkedin /> LinkedIn
                    </button>
                </div>
            )}
        </section>
    );
};

export default HeroSection;
