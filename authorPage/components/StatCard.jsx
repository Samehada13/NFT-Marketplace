import React from 'react';
import { MdVerified } from 'react-icons/md';
import {
    HiOutlineCollection,
    HiOutlineCurrencyDollar,
    HiOutlineUsers,
    HiOutlineTrendingUp
} from 'react-icons/hi';
import styles from './StatCard.module.css';

const StatCard = ({
    title,
    value,
    icon: Icon,
    gradient = 'blue',
    change = null,
    className = ''
}) => {
    const gradientClasses = {
        blue: styles.gradientBlue,
        green: styles.gradientGreen,
        purple: styles.gradientPurple,
        orange: styles.gradientOrange
    };

    return (
        <div className={`${styles.statCard} ${gradientClasses[gradient]} ${className}`}>
            <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                    {Icon && <Icon className={styles.icon} />}
                </div>
                <div className={styles.textContent}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.value}>{value}</p>
                    {change && (
                        <span className={`${styles.change} ${change.startsWith('+') ? styles.positive : styles.negative}`}>
                            {change}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
