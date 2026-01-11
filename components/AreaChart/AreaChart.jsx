import React, { useState, useEffect } from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import Style from './AreaChart.module.css';
import { getCoinChartData, COIN_IDS } from '../../utils/coinGecko';

const AreaChart = ({ nftData = [], activeCategory = 'All' }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [timeFilter, setTimeFilter] = useState('today'); // 'today', 'month', 'yearly'
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            // Filter NFT data if provided
            const filteredNFTs = nftData ? nftData.filter(nft => {
                if (!nft.price) return false;
                if (activeCategory && activeCategory !== 'All') {
                    if ((nft.category || '').toLowerCase() !== activeCategory.toLowerCase()) return false;
                }

                // Filter by Time
                if (nft.timestamp) {
                    const nftDate = new Date(nft.timestamp);
                    const now = new Date();
                    const diffTime = Math.abs(now - nftDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (timeFilter === 'today') {
                        return diffDays <= 1;
                    } else if (timeFilter === 'month') {
                        return diffDays <= 30;
                    } else if (timeFilter === 'yearly') {
                        return diffDays <= 365;
                    }
                }
                return true;
            }) : [];

            if (filteredNFTs.length > 0) {
                // Scenario 1: Use NFT Data (User's Portfolio/Listing History)
                // Sort by timestamp
                const sortedNFTs = [...filteredNFTs].sort((a, b) => {
                    const dateA = new Date(a.timestamp);
                    const dateB = new Date(b.timestamp);
                    return dateA - dateB;
                });

                // Transform to chart format
                const data = sortedNFTs.map(nft => {
                    const date = new Date(nft.timestamp);
                    return {
                        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        day: date.getDate(),
                        month: date.toLocaleString('default', { month: 'short' }),
                        fullDate: date,
                        floorPrice: parseFloat(nft.price).toFixed(4),
                        name: nft.name // Add name for tooltip
                    };
                });

                setChartData(data);
                setLoading(false);

            } else {
                // Scenario 2: Fallback to CoinGecko (MATIC Price)
                try {
                    let days = 1;
                    if (timeFilter === 'today') days = 1;
                    else if (timeFilter === 'month') days = 30;
                    else if (timeFilter === 'yearly') days = 365;

                    const coinData = await getCoinChartData(COIN_IDS.MATIC, 'usd', days);

                    const formattedData = coinData.map(item => ({
                        time: item.time, // Utility returns formatted date string
                        floorPrice: item.price.toFixed(4),
                        fullDate: item.time // Use the time string as fullDate for now
                    }));

                    setChartData(formattedData);
                } catch (error) {
                    console.error("Failed to load chart data:", error);
                    setChartData([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        loadData();
    }, [nftData, activeCategory, timeFilter]);

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={Style.customTooltip}>
                    <p className={Style.tooltipDay}>
                        {payload[0].payload.name ? payload[0].payload.name : label}
                    </p>
                    <p className={Style.tooltipVolume}>
                        <span className={Style.tooltipLabel}>
                            {payload[0].payload.name ? 'Price:' : 'MATIC Price:'}
                        </span>
                        <span className={Style.tooltipValue}>
                            {payload[0].value} {payload[0].payload.name ? 'MATIC' : 'USD'}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    // Calculate stats
    const validPrices = chartData.filter(d => parseFloat(d.floorPrice) > 0);
    const averageFloorPrice = validPrices.length > 0
        ? (validPrices.reduce((sum, d) => sum + parseFloat(d.floorPrice), 0) / validPrices.length).toFixed(4)
        : '0.0000';

    const floorStatData = validPrices.length > 0
        ? validPrices.reduce((min, curr) => parseFloat(curr.floorPrice) < parseFloat(min.floorPrice) ? curr : min)
        : { floorPrice: 0 };

    if (!mounted) return null;

    return (
        <div className={Style.areaChart}>
            <div className={Style.chartHeader}>
                <div className="flex items-center gap-3">
                    <div className="w-1 h-12 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full" />
                    <div>
                        <h2 className={Style.title}>
                            {nftData && nftData.length > 0 ? 'Portfolio Value' : 'MATIC Price Trend'}
                        </h2>
                        <p className={Style.subtitle}>
                            {activeCategory === 'All' ? 'All Collections' : `${activeCategory} Collection`}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setTimeFilter('today')}
                        className={`px-4 py-2 rounded font-semibold transition ${timeFilter === 'today'
                            ? 'bg-violet-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setTimeFilter('month')}
                        className={`px-4 py-2 rounded font-semibold transition ${timeFilter === 'month'
                            ? 'bg-violet-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Month
                    </button>
                    <button
                        onClick={() => setTimeFilter('yearly')}
                        className={`px-4 py-2 rounded font-semibold transition ${timeFilter === 'yearly'
                            ? 'bg-violet-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Year
                    </button>
                </div>
            </div>

            <div className={Style.stats}>
                <div className={Style.statItem}>
                    <span className={Style.statLabel}>Average Price</span>
                    <span className={Style.statValue}>{averageFloorPrice} {nftData && nftData.length > 0 ? 'MATIC' : 'USD'}</span>
                </div>
                <div className={Style.statItem}>
                    <span className={Style.statLabel}>Floor Price</span>
                    <span className={Style.statValue}>{parseFloat(floorStatData.floorPrice).toFixed(4)} {nftData && nftData.length > 0 ? 'MATIC' : 'USD'}</span>
                </div>
            </div>

            <div className={Style.chartContainer}>
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        Loading Chart...
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsAreaChart
                            data={chartData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            onMouseMove={(state) => {
                                if (state && state.activeTooltipIndex !== undefined) {
                                    setActiveIndex(state.activeTooltipIndex);
                                }
                            }}
                            onMouseLeave={() => {
                                setActiveIndex(null);
                            }}
                        >
                            <defs>
                                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9565e8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#fbc64c" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.3} />
                            <XAxis
                                dataKey="time"
                                stroke="#9565e8"
                                style={{ fontSize: '14px', fontWeight: 600 }}
                            />
                            <YAxis
                                stroke="#9565e8"
                                style={{ fontSize: '12px' }}
                                tickFormatter={(value) => `${parseFloat(value).toFixed(2)}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="floorPrice"
                                stroke="#9565e8"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorVolume)"
                                animationDuration={1500}
                                animationEasing="ease-in-out"
                            />
                        </RechartsAreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default AreaChart;
