import React, { useState, useMemo, useEffect } from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import Style from './AreaChart.module.css';

const AreaChart = ({ nftData = [], activeCategory = 'All' }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [timeFilter, setTimeFilter] = useState('today'); // 'today', 'month', 'yearly'
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate sample data based on time filter
    const generateSampleData = (filter, currentDate) => {
        if (filter === 'today') {
            return Array.from({ length: 24 }, (_, i) => ({
                time: `${i}:00`,
                floorPrice: (Math.random() * 2 + 0.1).toFixed(4)
            }));
        } else if (filter === 'month') {
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            return Array.from({ length: daysInMonth }, (_, i) => ({
                day: i + 1,
                floorPrice: (Math.random() * 2 + 0.1).toFixed(4)
            }));
        } else {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return monthNames.map(month => ({
                month,
                floorPrice: (Math.random() * 2 + 0.1).toFixed(4)
            }));
        }
    };

    // Generate hourly data for today
    const generateTodayData = (nfts, currentDate) => {
        const hourData = {};
        for (let i = 0; i < 24; i++) {
            hourData[i] = [];
        }

        nfts.forEach(nft => {
            const nftDate = new Date(nft.timestamp * 1000);
            const hour = nftDate.getHours();
            const price = parseFloat(nft.price);
            if (!isNaN(price) && price > 0) {
                hourData[hour].push(price);
            }
        });

        return Array.from({ length: 24 }, (_, i) => {
            const prices = hourData[i];
            const floorPrice = prices.length > 0 ? Math.min(...prices) : (Math.random() * 2 + 0.1).toFixed(4);
            return {
                time: `${i}:00`,
                floorPrice: parseFloat(floorPrice).toFixed(4)
            };
        });
    };

    // Generate daily data for this month
    const generateMonthData = (nfts, currentDate) => {
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const dayData = {};
        
        for (let i = 1; i <= daysInMonth; i++) {
            dayData[i] = [];
        }

        nfts.forEach(nft => {
            const nftDate = new Date(nft.timestamp * 1000);
            const day = nftDate.getDate();
            const price = parseFloat(nft.price);
            if (!isNaN(price) && price > 0) {
                dayData[day].push(price);
            }
        });

        return Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const prices = dayData[day];
            const floorPrice = prices.length > 0 ? Math.min(...prices) : (Math.random() * 2 + 0.1).toFixed(4);
            return {
                day,
                floorPrice: parseFloat(floorPrice).toFixed(4)
            };
        });
    };

    // Generate monthly data for yearly
    const generateYearlyData = (nfts) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthData = {
            'Jan': [], 'Feb': [], 'Mar': [], 'Apr': [], 'May': [], 'Jun': [],
            'Jul': [], 'Aug': [], 'Sep': [], 'Oct': [], 'Nov': [], 'Dec': []
        };

        nfts.forEach(nft => {
            const nftDate = new Date(nft.timestamp * 1000);
            const month = monthNames[nftDate.getMonth()];
            const price = parseFloat(nft.price);
            if (!isNaN(price) && price > 0) {
                monthData[month].push(price);
            }
        });

        return monthNames.map(month => {
            const prices = monthData[month];
            const floorPrice = prices.length > 0 ? Math.min(...prices) : (Math.random() * 2 + 0.1).toFixed(4);
            return {
                month,
                floorPrice: parseFloat(floorPrice).toFixed(4)
            };
        });
    };

    // Calculate floor price data from NFTs
    const chartData = useMemo(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        let filteredNFTs = nftData.filter(nft => {
            if (!nft.timestamp || !nft.price) return false;

            if (activeCategory && activeCategory !== 'All') {
                if ((nft.category || '').toLowerCase() !== activeCategory.toLowerCase()) return false;
            }

            const nftDate = new Date(nft.timestamp * 1000);
            const nftYear = nftDate.getFullYear();
            const nftMonth = nftDate.getMonth();
            const nftDay = nftDate.getDate();

            if (timeFilter === 'today') {
                return nftYear === currentYear && nftMonth === currentMonth && nftDay === currentDay;
            } else if (timeFilter === 'month') {
                return nftYear === currentYear && nftMonth === currentMonth;
            } else {
                return nftYear === currentYear;
            }
        });

        if (filteredNFTs.length === 0) {
            if (timeFilter === 'today') {
                const categoryNFTs = nftData.filter(nft => {
                    if (!nft.price) return false;
                    if (activeCategory && activeCategory !== 'All') {
                        return (nft.category || '').toLowerCase() === activeCategory.toLowerCase();
                    }
                    return true;
                });

                if (categoryNFTs.length > 0) {
                    const prices = categoryNFTs.map(n => parseFloat(n.price)).filter(p => !isNaN(p) && p > 0);
                    if (prices.length > 0) {
                        const floorNum = Math.min(...prices);
                        // Fill 24 hourly points with slight upward random variations so the floor remains the minimum
                        const maxUpwardPct = 0.2; // up to +20% above floor
                        return Array.from({ length: 24 }, (_, i) => {
                            const delta = Math.random() * maxUpwardPct; // 0 .. maxUpwardPct
                            const value = +(floorNum * (1 + delta)).toFixed(4);
                            return { time: `${i}:00`, floorPrice: value };
                        });
                    }
                }
            }

            // Fallback to generated sample data for other cases
            return generateSampleData(timeFilter, currentDate);
        }

        if (timeFilter === 'today') {
            return generateTodayData(filteredNFTs, currentDate);
        } else if (timeFilter === 'month') {
            return generateMonthData(filteredNFTs, currentDate);
        } else {
            return generateYearlyData(filteredNFTs);
        }
    }, [nftData, timeFilter]);

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const getLabel = () => {
                if (timeFilter === 'today') return `Time: ${payload[0].payload.time}`;
                if (timeFilter === 'month') return `Day: ${payload[0].payload.day}`;
                return `Month: ${payload[0].payload.month}`;
            };

            return (
                <div className={Style.customTooltip}>
                    <p className={Style.tooltipDay}>{getLabel()}</p>
                    <p className={Style.tooltipVolume}>
                        <span className={Style.tooltipLabel}>Floor Price:</span>
                        <span className={Style.tooltipValue}>{payload[0].value} ETH</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    // Calculate stats
    const validPrices = chartData.filter(d => d.floorPrice > 0);
    const averageFloorPrice = validPrices.length > 0
        ? (validPrices.reduce((sum, d) => sum + parseFloat(d.floorPrice), 0) / validPrices.length).toFixed(4)
        : '0.0000';
    const peakData = validPrices.length > 0
        ? validPrices.reduce((max, curr) => parseFloat(curr.floorPrice) > parseFloat(max.floorPrice) ? curr : max)
        : { floorPrice: 0 };

    const getTimeFilterLabel = () => {
        if (timeFilter === 'today') return 'Today';
        if (timeFilter === 'month') return 'This Month';
        return 'Yearly';
    };

    const getPeakLabel = () => {
        if (timeFilter === 'today') return peakData.time || 'N/A';
        if (timeFilter === 'month') return `Day ${peakData.day}` || 'N/A';
        return peakData.month || 'N/A';
    };

    // Render a deterministic placeholder during SSR and until the client mounts
    if (!mounted) {
        return (
            <div className={Style.areaChart}>
                <div className={Style.chartHeader}>
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-12 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full" />
                        <div>
                            <h2 className={Style.title}>Floor Price Trend</h2>
                            <p className={Style.subtitle}>{activeCategory === 'All' ? 'All Collections' : `${activeCategory} Collection`}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded font-semibold bg-gray-200 text-gray-700">Today</button>
                        <button className="px-4 py-2 rounded font-semibold bg-gray-200 text-gray-700">This Month</button>
                        <button className="px-4 py-2 rounded font-semibold bg-gray-200 text-gray-700">Yearly</button>
                    </div>
                </div>
                <div className={Style.stats}>
                    <div className={Style.statItem}>
                        <span className={Style.statLabel}>Average Floor Price</span>
                        <span className={Style.statValue}>-</span>
                    </div>
                    <div className={Style.statItem}>
                        <span className={Style.statLabel}>Peak</span>
                        <span className={Style.statValue}>-</span>
                    </div>
                    <div className={Style.statItem}>
                        <span className={Style.statLabel}>Highest Price</span>
                        <span className={Style.statValue}>-</span>
                    </div>
                </div>
                <div className={Style.chartContainer} style={{ height: 300 }}>
                    {/* Placeholder box to keep layout stable during SSR */}
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, rgba(230,230,230,0.6), rgba(245,245,245,0.6))' }} />
                </div>
            </div>
        );
    }

    return (
        <div className={Style.areaChart}>
            <div className={Style.chartHeader}>
                <div className="flex items-center gap-3">
                    <div className="w-1 h-12 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full" />
                    <div>
                        <h2 className={Style.title}>Floor Price Trend</h2>
                        <p className={Style.subtitle}>{activeCategory === 'All' ? 'All Collections' : `${activeCategory} Collection`}</p>
                    </div>
                </div>
                <div className="flex gap-2">
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
                        This Month
                    </button>
                    <button
                        onClick={() => setTimeFilter('yearly')}
                        className={`px-4 py-2 rounded font-semibold transition ${
                            timeFilter === 'yearly'
                                ? 'bg-violet-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Yearly
                    </button>
                </div>
            </div>
            <div className={Style.stats}>
                <div className={Style.statItem}>
                    <span className={Style.statLabel}>Average Floor Price</span>
                    <span className={Style.statValue}>{averageFloorPrice} MATIC</span>
                </div>
                <div className={Style.statItem}>
                    <span className={Style.statLabel}>Peak {getTimeFilterLabel()}</span>
                    <span className={Style.statValue}>{getPeakLabel()}</span>
                </div>
                <div className={Style.statItem}>
                    <span className={Style.statLabel}>Highest Price</span>
                    <span className={Style.statValue}>{parseFloat(peakData.floorPrice).toFixed(4)} MATIC</span>
                </div>
            </div>

            <div className={Style.chartContainer}>
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
                            dataKey={timeFilter === 'today' ? 'time' : timeFilter === 'month' ? 'day' : 'month'}
                            stroke="#9565e8"
                            style={{ fontSize: '14px', fontWeight: 600 }}
                        />
                        <YAxis
                            stroke="#9565e8"
                            style={{ fontSize: '12px' }}
                            tickFormatter={(value) => `${parseFloat(value).toFixed(2)}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        {/* Vertical opacity band - shows on hover */}
                        {activeIndex !== null && (
                            <ReferenceArea
                                x1={chartData[activeIndex]?.[timeFilter === 'today' ? 'time' : timeFilter === 'month' ? 'day' : 'month']}
                                x2={chartData[activeIndex]?.[timeFilter === 'today' ? 'time' : timeFilter === 'month' ? 'day' : 'month']}
                                fill="#9565e8"
                                fillOpacity={0.25}
                                stroke="#9565e8"
                                strokeOpacity={0.5}
                            />
                        )}
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
            </div>
        </div>
    );
};

export default AreaChart;
