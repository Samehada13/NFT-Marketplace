import React from 'react';
import {
    MdShoppingCart,
    MdGavel,
    MdSwapHoriz,
    MdSell,
    MdNewReleases
} from 'react-icons/md';
import styles from './RecentActivity.module.css';

const RecentActivity = ({ activities = [] }) => {
    // Sample activities if none provided
    const sampleActivities = [
        {
            type: 'listed',
            title: 'NFT Listed',
            nftName: 'Cool NFT #123',
            price: '2.5 ETH',
            timestamp: '2 hours ago',
            icon: MdSell,
            color: '#9565e8'
        },
        {
            type: 'sale',
            title: 'Sale Completed',
            nftName: 'Awesome Art #456',
            price: '5.0 ETH',
            timestamp: '5 hours ago',
            icon: MdShoppingCart,
            color: '#10b981'
        },
        {
            type: 'bid',
            title: 'Bid Received',
            nftName: 'Digital Piece #789',
            price: '3.2 ETH',
            timestamp: '1 day ago',
            icon: MdGavel,
            color: '#fbc64c'
        },
        {
            type: 'transfer',
            title: 'NFT Transferred',
            nftName: 'Rare Item #234',
            price: null,
            timestamp: '2 days ago',
            icon: MdSwapHoriz,
            color: '#3b82f6'
        },
        {
            type: 'minted',
            title: 'NFT Minted',
            nftName: 'New Creation #567',
            price: null,
            timestamp: '3 days ago',
            icon: MdNewReleases,
            color: '#7c3aed'
        }
    ];

    const activityList = activities.length > 0 ? activities : sampleActivities;

    return (
        <div className={styles.timeline}>
            <h3 className={styles.title}>Recent Activity</h3>

            <div className={styles.timelineContainer}>
                {activityList.map((activity, index) => {
                    const IconComponent = activity.icon;

                    return (
                        <div key={index} className={styles.timelineItem}>
                            {/* Timeline connector */}
                            {index < activityList.length - 1 && (
                                <div className={styles.timelineConnector} />
                            )}

                            {/* Activity icon */}
                            <div
                                className={styles.iconBadge}
                                style={{ backgroundColor: activity.color }}
                            >
                                <IconComponent className={styles.icon} />
                            </div>

                            {/* Activity content */}
                            <div className={styles.activityContent}>
                                <div className={styles.activityHeader}>
                                    <h4 className={styles.activityTitle}>{activity.title}</h4>
                                    <span className={styles.timestamp}>{activity.timestamp}</span>
                                </div>

                                <p className={styles.nftName}>{activity.nftName}</p>

                                {activity.price && (
                                    <p className={styles.price}>{activity.price}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className={styles.loadMore}>
                View All Activity
            </button>
        </div>
    );
};

export default RecentActivity;
