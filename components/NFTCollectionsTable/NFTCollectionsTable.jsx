import React, { useRef, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Chart, registerables } from 'chart.js';
import Style from './NFTCollectionsTable.module.css';

Chart.register(...registerables);

const MiniSparkline = ({ data, color, isPositive }) => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            // Destroy existing chart if any
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map((_, i) => i),
                    datasets: [{
                        data: data,
                        borderColor: color,
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    interaction: {
                        mode: 'nearest',
                        intersect: false
                    }
                }
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data, color]);

    return (
        <div className={Style.sparklineContainer}>
            <canvas ref={canvasRef} width="150" height="40"></canvas>
        </div>
    );
};

const NFTCollectionsTable = () => {
    // Hardcoded collections data
    const collections = [
        {
            rank: 1,
            name: 'CryptoPunks 721',
            icon: '🎭',
            verified: true,
            floor: '--',
            topOffer: '27.15 MATIC',
            change: null,
            volume: '74.14 MATIC',
            sales: 2,
            listed: '0%',
            listedDetails: '0 / 127',
            chartData: [20, 25, 22, 28, 27, 30, 28, 26, 27, 29],
            chartColor: '#ef4444',
            chartPositive: false
        },
        {
            rank: 2,
            name: 'Pudgy Penguins',
            icon: '🐧',
            verified: true,
            floor: '5.19 MATIC',
            topOffer: '5.09 MATIC',
            change: '+0.9%',
            volume: '61.13 MATIC',
            sales: 12,
            listed: '1.1%',
            listedDetails: '97 / 8,888',
            chartData: [50, 52, 49, 51, 53, 55, 54, 56, 55, 57],
            chartColor: '#10b981',
            chartPositive: true
        },
        {
            rank: 3,
            name: 'ENS: Ethereum Na...',
            icon: '💎',
            verified: true,
            floor: '< 0.01 MATIC',
            topOffer: '--',
            change: null,
            volume: '60.57 MATIC',
            sales: 27,
            listed: '0.8%',
            listedDetails: '28.2K / 3.5M',
            chartData: [40, 38, 42, 39, 41, 43, 40, 42, 41, 40],
            chartColor: '#10b981',
            chartPositive: true
        },
        {
            rank: 4,
            name: 'Moonbirds',
            icon: '🦉',
            verified: true,
            floor: '1.83 MATIC',
            topOffer: '1.79 MATIC',
            change: '-3.2%',
            volume: '54.70 MATIC',
            sales: 30,
            listed: '2.1%',
            listedDetails: '205 / 9,989',
            chartData: [60, 58, 55, 52, 50, 48, 46, 44, 42, 40],
            chartColor: '#ef4444',
            chartPositive: false
        },
        {
            rank: 5,
            name: 'DX Terminal',
            icon: '🖥️',
            verified: true,
            floor: '< 0.01 MATIC',
            topOffer: '< 0.01 MATIC',
            change: '+7.4%',
            volume: '45.31 MATIC',
            sales: 527,
            listed: '11.4%',
            listedDetails: '4,068 / 35.6K',
            chartData: [30, 32, 35, 38, 42, 45, 48, 52, 55, 58],
            chartColor: '#10b981',
            chartPositive: true
        },
        {
            rank: 6,
            name: 'Meta Legends',
            icon: '👾',
            verified: true,
            floor: '0.02 MATIC',
            topOffer: '0.02 MATIC',
            change: '+0.9%',
            volume: '39.40 MATIC',
            sales: 2321,
            listed: '0.9%',
            listedDetails: '100 / 12.3K',
            chartData: [35, 36, 38, 37, 39, 40, 41, 42, 41, 43],
            chartColor: '#10b981',
            chartPositive: true
        },
        {
            rank: 7,
            name: 'Lil Pudgys',
            icon: '🐧',
            verified: true,
            floor: '0.62 MATIC',
            topOffer: '0.62 MATIC',
            change: '-2.6%',
            volume: '29.06 MATIC',
            sales: 46,
            listed: '1.9%',
            listedDetails: '427 / 21.9K',
            chartData: [50, 48, 46, 44, 42, 40, 38, 36, 35, 34],
            chartColor: '#ef4444',
            chartPositive: false
        },
        {
            rank: 8,
            name: 'Mad Lads',
            icon: '😎',
            verified: true,
            floor: '27.45 SOL',
            topOffer: '24.65 SOL',
            change: '+7.6%',
            volume: '619.34 SOL',
            sales: 24,
            listed: '3.3%',
            listedDetails: '327 / 9,685',
            chartData: [100, 105, 110, 115, 120, 125, 130, 135, 140, 145],
            chartColor: '#10b981',
            chartPositive: true
        }
    ];

    return (
        <div className={Style.tableContainer}>
            <div className={Style.titleSection}>
                <h2>Top NFT Collections</h2>
                <p>Discover the trending NFT collections with live stats and market data</p>
            </div>

            <div className={Style.header}>
                <div className={Style.tabs}>
                    <button className={`${Style.tab} ${Style.active}`}>
                        <AiFillStar /> Top
                    </button>
                    <button className={Style.tab}>Memecoin NFTs</button>
                </div>
                <div className={Style.filters}>
                    <span className={Style.badge}>Badged</span>
                    <span className={Style.currency}>USD</span>
                    <div className={Style.timeFilters}>
                        <button>10m</button>
                        <button>1h</button>
                        <button>6h</button>
                        <button className={Style.activeTime}>1d</button>
                        <button>7d</button>
                        <button>30d</button>
                    </div>
                    <button className={Style.seeAllBtn}>See all →</button>
                </div>
            </div>

            <table className={Style.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Collection</th>
                        <th>Floor ↓</th>
                        <th>Top Offer ↓</th>
                        <th>Floor 1d % ↓</th>
                        <th>Volume ↓</th>
                        <th>Sales ↓</th>
                        <th>Listed ↓</th>
                        <th>Last 1d</th>
                    </tr>
                </thead>
                <tbody>
                    {collections.map((collection) => (
                        <tr key={collection.rank}>
                            <td className={Style.rankCell}>
                                <AiFillStar className={Style.starIcon} />
                                {collection.rank}
                            </td>
                            <td className={Style.collectionCell}>
                                <div className={Style.collectionInfo}>
                                    <span className={Style.icon}>{collection.icon}</span>
                                    <span className={Style.name}>{collection.name}</span>
                                    {collection.verified && <span className={Style.verified}>✓</span>}
                                </div>
                            </td>
                            <td className={Style.valueCell}>{collection.floor}</td>
                            <td className={Style.valueCell}>{collection.topOffer}</td>
                            <td className={Style.changeCell}>
                                {collection.change ? (
                                    <span className={collection.chartPositive ? Style.positive : Style.negative}>
                                        {collection.change}
                                    </span>
                                ) : (
                                    '--'
                                )}
                            </td>
                            <td className={Style.valueCell}>{collection.volume}</td>
                            <td className={Style.salesCell}>{collection.sales}</td>
                            <td className={Style.listedCell}>
                                <div className={Style.listedInfo}>
                                    <span className={Style.percentage}>{collection.listed}</span>
                                    <span className={Style.details}>{collection.listedDetails}</span>
                                </div>
                            </td>
                            <td className={Style.chartCell}>
                                <MiniSparkline
                                    data={collection.chartData}
                                    color={collection.chartColor}
                                    isPositive={collection.chartPositive}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NFTCollectionsTable;
