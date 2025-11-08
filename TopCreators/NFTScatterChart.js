import React, { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';

const NFTScatterChart = ({ nfts = [] }) => {
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, data: null });

  // Convert Wei to Matic/Ether using ethers.js
  const weiToMatic = (weiValue) => {
    try {
      const matic = parseFloat(ethers.utils.formatEther(weiValue));
      return matic;
    } catch (error) {
      console.error('Error converting Wei to Matic:', error);
      return 0;
    }
  };

  // Process NFT data for scatter plot
  const processScatterData = (nfts) => {
    if (!Array.isArray(nfts) || nfts.length === 0) return [];

    return nfts.map((nft, index) => {
      const price = weiToMatic(nft.price);
      const timestamp = nft.timestamp ? nft.timestamp * 1000 : Date.now();
      const date = new Date(timestamp);
      
      // Calculate days since listing
      const daysSinceListing = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);

      return {
        x: daysSinceListing,
        y: price,
        name: nft.name || `NFT #${nft.tokenId}`,
        tokenId: nft.tokenId,
        category: nft.category || 'Unknown',
        rarity: nft.properties?.rarity || 'Common',
        date: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        royalties: nft.royalties || '0',
        seller: nft.seller,
        owner: nft.owner
      };
    }).filter(d => d.y > 0 && !isNaN(d.x));
  };

  // Get color based on category
  const getCategoryColor = (category) => {
    const colors = {
      'Art': '#ef4444',
      'Music': '#8b5cf6',
      'Gaming': '#3b82f6',
      'Photography': '#10b981',
      'Sports': '#f59e0b',
      'Collectibles': '#ec4899',
      'Utility': '#06b6d4',
      'Unknown': '#6b7280'
    };
    return colors[category] || colors['Unknown'];
  };

  // Get rarity size
  const getRaritySize = (rarity) => {
    const sizes = {
      'Common': 6,
      'Uncommon': 8,
      'Rare': 10,
      'Epic': 12,
      'Legendary': 14
    };
    return sizes[rarity] || 6;
  };

  useEffect(() => {
    if (!nfts || nfts.length === 0) {
      setIsLoading(false);
      return;
    }

    try {
      const processed = processScatterData(nfts);
      
      if (processed.length === 0) {
        setError('No valid NFT data available');
        setIsLoading(false);
        return;
      }

      setChartData(processed);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error processing data:', err);
      setError('Failed to process chart data');
      setIsLoading(false);
    }
  }, [nfts]);

  useEffect(() => {
    if (!chartData.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 60, right: 100, bottom: 80, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Calculate scales
    const xValues = chartData.map(d => d.x);
    const yValues = chartData.map(d => d.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues) * 0.9;
    const maxY = Math.max(...yValues) * 1.1;
    const xRange = maxX - minX || 1;
    const yRange = maxY - minY || 1;

    // Clear canvas
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, width, height);

    // Draw title
    ctx.fillStyle = '#e5e7eb';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NFT Price vs Time Analysis', width / 2, 30);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(75, 85, 99, 0.3)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Y-axis labels
      const price = maxY - (yRange / 5) * i;
      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(2), padding.left - 10, y + 4);
    }

    // Vertical grid lines
    for (let i = 0; i <= 5; i++) {
      const x = padding.left + (chartWidth / 5) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, height - padding.bottom);
      ctx.stroke();

      // X-axis labels
      const days = minX + (xRange / 5) * i;
      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(Math.round(days) + 'd', x, height - padding.bottom + 20);
    }

    // Draw axes
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();

    // Draw points
    chartData.forEach((point, index) => {
      const x = padding.left + ((point.x - minX) / xRange) * chartWidth;
      const y = padding.top + ((maxY - point.y) / yRange) * chartHeight;
      const radius = getRaritySize(point.rarity);
      const color = getCategoryColor(point.category);

      // Draw point
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Add border for hovered point
      if (hoveredPoint === index) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Subtle border for all points
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Axis labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px sans-serif';
    
    // Y-axis label
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Price (Matic)', 0, 0);
    ctx.restore();

    // X-axis label
    ctx.textAlign = 'center';
    ctx.fillText('Days Since Listing', width / 2, height - 20);

    // Draw legend
    const categories = [...new Set(chartData.map(d => d.category))];
    const legendX = width - padding.right + 10;
    let legendY = padding.top;
    
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    
    categories.forEach((category, i) => {
      const color = getCategoryColor(category);
      const y = legendY + i * 25;
      
      // Draw color circle
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(legendX, y, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw text
      ctx.fillStyle = '#9ca3af';
      ctx.fillText(category, legendX + 15, y + 4);
    });

  }, [chartData, hoveredPoint]);

  const handleMouseMove = (e) => {
    if (!canvasRef.current || !chartData.length) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const padding = { top: 60, right: 100, bottom: 80, left: 80 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;

    const xValues = chartData.map(d => d.x);
    const yValues = chartData.map(d => d.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues) * 0.9;
    const maxY = Math.max(...yValues) * 1.1;
    const xRange = maxX - minX || 1;
    const yRange = maxY - minY || 1;

    let foundPoint = null;
    let foundIndex = null;

    chartData.forEach((point, index) => {
      const x = padding.left + ((point.x - minX) / xRange) * chartWidth;
      const y = padding.top + ((maxY - point.y) / yRange) * chartHeight;
      const radius = getRaritySize(point.rarity);

      const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
      
      if (distance <= radius + 5) {
        foundPoint = point;
        foundIndex = index;
      }
    });

    if (foundPoint) {
      setHoveredPoint(foundIndex);
      setTooltip({
        show: true,
        x: e.clientX,
        y: e.clientY,
        data: foundPoint
      });
    } else {
      setHoveredPoint(null);
      setTooltip({ show: false, x: 0, y: 0, data: null });
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
    setTooltip({ show: false, x: 0, y: 0, data: null });
  };

  if (isLoading && nfts.length > 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-900 rounded-lg">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
          <p className="text-gray-300">Loading chart data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-900 rounded-lg">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-400 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!nfts || nfts.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-900 rounded-lg border-2 border-dashed border-gray-700">
        <div className="text-center px-4">
          <svg className="mx-auto h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No NFT Data Available</h3>
          <p className="text-gray-500">Start trading NFTs to see analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 rounded-lg shadow-xl relative">
      <div className="relative" style={{ height: '500px' }}>
        <canvas 
          ref={canvasRef} 
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      
      {/* Tooltip */}
      {tooltip.show && tooltip.data && (
        <div 
          style={{
            position: 'fixed',
            left: tooltip.x + 10,
            top: tooltip.y + 10,
            pointerEvents: 'none',
            zIndex: 1000
          }}
          className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl"
        >
          <div className="text-white text-sm space-y-1">
            <div className="font-bold text-base mb-2">{tooltip.data.name}</div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Price:</span>
              <span className="font-semibold text-green-400">{tooltip.data.y.toFixed(2)} Matic</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Category:</span>
              <span>{tooltip.data.category}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Rarity:</span>
              <span>{tooltip.data.rarity}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Listed:</span>
              <span>{tooltip.data.date}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Royalties:</span>
              <span>{tooltip.data.royalties}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Token ID:</span>
              <span>#{tooltip.data.tokenId}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTScatterChart;