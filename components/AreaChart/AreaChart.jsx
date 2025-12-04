import React, { useState } from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import Style from './AreaChart.module.css';

const AreaChart = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    // Sample hardcoded data - NFT trading volume over 12 months (1 year)
    const data = [
        { day: 'Jan', volume: 42, sales: 325 },
        { day: 'Feb', volume: 55, sales: 420 },
        { day: 'Mar', volume: 68, sales: 510 },
        { day: 'Apr', volume: 82, sales: 645 },
        { day: 'May', volume: 95, sales: 780 },
        { day: 'Jun', volume: 88, sales: 720 },
        { day: 'Jul', volume: 72, sales: 590 },
        { day: 'Aug', volume: 58, sales: 465 },
        { day: 'Sep', volume: 48, sales: 380 },
        { day: 'Oct', volume: 62, sales: 495 },
        { day: 'Nov', volume: 78, sales: 625 },
        { day: 'Dec', volume: 92, sales: 745 }
    ];

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={Style.customTooltip}>
                    <p className={Style.tooltipDay}>{payload[0].payload.day}</p>
                    <p className={Style.tooltipVolume}>
                        <span className={Style.tooltipLabel}>Volume:</span>
                        <span className={Style.tooltipValue}>{payload[0].value} ETH</span>
                    </p>
                    <p className={Style.tooltipSales}>
                        <span className={Style.tooltipLabel}>Sales:</span>
                        <span className={Style.tooltipValue}>{payload[0].payload.sales}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    const totalVolume = data.reduce((acc, curr) => acc + curr.volume, 0);
    const peakDay = data.reduce((max, curr) => curr.volume > max.volume ? curr : max);

    return (
        <div className={Style.areaChart}>
            <div className={Style.chartHeader}>
                <div className="flex items-center gap-3">
                    <div className="w-1 h-12 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full" />
                    <div>
                        <h2 className={Style.title}>NFT Trading Volume</h2>
                        <p className={Style.subtitle}>Yearly Activity Overview</p>
                    </div>
                </div>
                <div className={Style.stats}>
                    <div className={Style.statItem}>
                        <span className={Style.statLabel}>Total Volume</span>
                        <span className={Style.statValue}>{totalVolume} ETH</span>
                    </div>
                    <div className={Style.statItem}>
                        <span className={Style.statLabel}>Peak Day</span>
                        <span className={Style.statValue}>{peakDay.day}</span>
                    </div>
                </div>
            </div>

            <div className={Style.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsAreaChart
                        data={data}
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
                            dataKey="day"
                            stroke="#9565e8"
                            style={{ fontSize: '14px', fontWeight: 600 }}
                        />
                        <YAxis
                            stroke="#9565e8"
                            style={{ fontSize: '12px' }}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        {/* Vertical opacity band - shows on hover */}
                        {activeIndex !== null && (
                            <ReferenceArea
                                x1={data[activeIndex]?.day}
                                x2={data[activeIndex]?.day}
                                fill="#9565e8"
                                fillOpacity={0.25}
                                stroke="#9565e8"
                                strokeOpacity={0.5}
                            />
                        )}
                        <Area
                            type="monotone"
                            dataKey="volume"
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
