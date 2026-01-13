import React, { useState, useEffect } from 'react';
import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import Style from './AreaChart.module.css';

// Helper to convert timestamp (seconds, ms, or ISO string) to Date
const toDate = (timestamp) => {
    if (!timestamp) return new Date();

    // If it's already a Date object
    if (timestamp instanceof Date) return timestamp;

    // If it's an ISO string like "2025-10-14T08:52:29.494Z"
    if (typeof timestamp === 'string') {
        return new Date(timestamp);
    }

    // If timestamp is in seconds (< year 3000 in seconds), convert to ms
    if (typeof timestamp === 'number' && timestamp < 100000000000) {
        return new Date(timestamp * 1000);
    }

    return new Date(timestamp);
};

const AreaChart = ({ nftData = [], activeCategory = 'All' }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [timeFilter, setTimeFilter] = useState('month'); // 'today' or 'month'
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const loadData = () => {
            setLoading(true);

            // First filter by category only
            const categoryFiltered = (nftData || []).filter((nft) => {
                if (!nft.price) return false;

                // Filter by category
                if (activeCategory && activeCategory !== 'All') {
                    if (
                        (nft.category || '').toLowerCase() !==
                        activeCategory.toLowerCase()
                    )
                        return false;
                }
                return true;
            });

            // Then filter by time
            const timeFiltered = categoryFiltered.filter((nft) => {
                if (nft.timestamp) {
                    const nftDate = toDate(nft.timestamp);
                    const now = new Date();
                    const diffTime = Math.abs(now - nftDate);
                    const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                    );

                    if (timeFilter === 'today') {
                        return diffDays <= 1;
                    } else if (timeFilter === 'month') {
                        return diffDays <= 30;
                    }
                }
                return true;
            });

            // Use time-filtered data if it has results, otherwise show ALL category-filtered data
            const filteredNFTs =
                timeFiltered.length > 0 ? timeFiltered : categoryFiltered;

            if (filteredNFTs.length > 0) {
                // Sort by timestamp (oldest first for chart)
                const sortedNFTs = [...filteredNFTs].sort((a, b) => {
                    const dateA = toDate(a.timestamp);
                    const dateB = toDate(b.timestamp);
                    return dateA - dateB;
                });

                // Transform to chart format
                const data = sortedNFTs.map((nft) => {
                    const date = toDate(nft.timestamp);
                    const priceValue =
                        typeof nft.price === 'string' && nft.price.length > 10
                            ? (parseFloat(nft.price) / 1e18).toFixed(4)
                            : parseFloat(nft.price).toFixed(4);
                    return {
                        time: date.toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                        }),
                        day: date.getDate(),
                        month: date.toLocaleString('default', {
                            month: 'short',
                        }),
                        fullDate: date,
                        floorPrice: priceValue,
                        name: nft.name,
                    };
                });

                setChartData(data);
            } else {
                // No data after filtering - show empty state
                setChartData([]);
            }
            setLoading(false);
        };

        loadData();
    }, [nftData, activeCategory, timeFilter]);

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={Style.customTooltip}>
                    <p className={Style.tooltipDay}>
                        {payload[0].payload.name || label}
                    </p>
                    <p className={Style.tooltipVolume}>
                        <span className={Style.tooltipLabel}>Price:</span>
                        <span className={Style.tooltipValue}>
                            {payload[0].value} MATIC
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    // Calculate stats
    const validPrices = chartData.filter((d) => parseFloat(d.floorPrice) > 0);
    const averageFloorPrice =
        validPrices.length > 0
            ? (
                  validPrices.reduce(
                      (sum, d) => sum + parseFloat(d.floorPrice),
                      0
                  ) / validPrices.length
              ).toFixed(4)
            : '0.0000';

    const floorStatData =
        validPrices.length > 0
            ? validPrices.reduce((min, curr) =>
                  parseFloat(curr.floorPrice) < parseFloat(min.floorPrice)
                      ? curr
                      : min
              )
            : { floorPrice: 0 };

    if (!mounted) return null;

    return (
        <div className={Style.areaChart}>
            <div className={Style.chartHeader}>
                <div className='flex items-center gap-3'>
                    <div className='w-1 h-12 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full' />
                    <div>
                        <h2 className={Style.title}>Portfolio Value</h2>
                        <p className={Style.subtitle}>
                            {activeCategory === 'All'
                                ? 'All Collections'
                                : `${activeCategory} Collection`}
                        </p>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <button
                        onClick={() => setTimeFilter('today')}
                        className={`px-4 py-2 rounded font-semibold transition ${
                            timeFilter === 'today'
                                ? 'bg-violet-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setTimeFilter('month')}
                        className={`px-4 py-2 rounded font-semibold transition ${
                            timeFilter === 'month'
                                ? 'bg-violet-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Month
                    </button>
                </div>
            </div>

            <div className={Style.stats}>
                <div className={Style.statItem}>
                    <span className={Style.statLabel}>Average Price</span>
                    <span className={Style.statValue}>
                        {averageFloorPrice} MATIC
                    </span>
                </div>
                <div className={Style.statItem}>
                    <span className={Style.statLabel}>Floor Price</span>
                    <span className={Style.statValue}>
                        {parseFloat(floorStatData.floorPrice).toFixed(4)} MATIC
                    </span>
                </div>
            </div>

            <div className={Style.chartContainer}>
                {loading ? (
                    <div className='flex items-center justify-center h-full'>
                        Loading Chart...
                    </div>
                ) : chartData.length === 0 ? (
                    <div className='flex items-center justify-center h-full text-gray-500'>
                        No data available for this time period
                    </div>
                ) : (
                    <ResponsiveContainer
                        width='100%'
                        height={300}
                    >
                        <RechartsAreaChart
                            data={chartData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            onMouseMove={(state) => {
                                if (
                                    state &&
                                    state.activeTooltipIndex !== undefined
                                ) {
                                    setActiveIndex(state.activeTooltipIndex);
                                }
                            }}
                            onMouseLeave={() => {
                                setActiveIndex(null);
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id='colorVolume'
                                    x1='0'
                                    y1='0'
                                    x2='0'
                                    y2='1'
                                >
                                    <stop
                                        offset='5%'
                                        stopColor='#9565e8'
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset='95%'
                                        stopColor='#fbc64c'
                                        stopOpacity={0.2}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray='3 3'
                                stroke='#e0e0e0'
                                opacity={0.3}
                            />
                            <XAxis
                                dataKey='time'
                                stroke='#9565e8'
                                style={{ fontSize: '14px', fontWeight: 600 }}
                            />
                            <YAxis
                                stroke='#9565e8'
                                style={{ fontSize: '12px' }}
                                tickFormatter={(value) =>
                                    `${parseFloat(value).toFixed(2)}`
                                }
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type='monotone'
                                dataKey='floorPrice'
                                stroke='#9565e8'
                                strokeWidth={3}
                                fillOpacity={1}
                                fill='url(#colorVolume)'
                                animationDuration={1500}
                                animationEasing='ease-in-out'
                            />
                        </RechartsAreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default AreaChart;
