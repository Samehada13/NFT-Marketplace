import { useState, useEffect } from 'react';

// CoinGecko API utilities
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

const COIN_IMAGES = {
  bitcoin: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
  ethereum: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
  'matic-network': 'https://coin-images.coingecko.com/coins/images/4713/small/matic-token-icon.png',
  binancecoin: 'https://coin-images.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
  ripple: 'https://coin-images.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
  solana: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
};

const COIN_NAMES = {
  bitcoin: { name: 'Bitcoin', symbol: 'BTC' },
  ethereum: { name: 'Ethereum', symbol: 'ETH' },
  'matic-network': { name: 'Polygon', symbol: 'MATIC' },
  binancecoin: { name: 'BNB', symbol: 'BNB' },
  ripple: { name: 'Ripple', symbol: 'XRP' },
  solana: { name: 'Solana', symbol: 'SOL' },
};

const COIN_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  MATIC: 'matic-network',
  BNB: 'binancecoin',
  XRP: 'ripple',
  SOL: 'solana',
};

const getMultipleCoinsData = async (coinIds, vsCurrency = 'php') => {
  try {
    const idsString = coinIds.join(',');
    const response = await fetch(
      `${COINGECKO_BASE_URL}/simple/price?ids=${idsString}&vs_currencies=${vsCurrency}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✓ Fetched all coin prices:', data);
    return data;
  } catch (error) {
    console.error('✗ Error fetching multiple coins:', error);
    return {};
  }
};

const transformCoinData = (coinId, priceData, vsCurrency = 'php') => {
  const coinInfo = COIN_NAMES[coinId];
  return {
    id: coinId,
    symbol: coinInfo?.symbol || coinId.toUpperCase(),
    name: coinInfo?.name || 'Unknown',
    image: COIN_IMAGES[coinId] || '',
    currentPrice: priceData[vsCurrency] ?? 0,
    priceChange24h: priceData[`${vsCurrency}_24h_change`] ?? 0,
    marketCap: priceData[`${vsCurrency}_market_cap`] ?? 0,
    volume24h: priceData[`${vsCurrency}_24h_vol`] ?? 0,
  };
};

// CryptoCard Component
const CryptoCard = ({ coinId, symbol, coinData, loading, error }) => {
  if (loading) {
    return (
      <div className='w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg border border-slate-700 overflow-hidden h-[200px] flex items-center justify-center'>
        <div className='text-slate-400 animate-pulse'>Loading {symbol}...</div>
      </div>
    );
  }

  if (error || !coinData) {
    return (
      <div className='w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg border border-red-900/30 overflow-hidden h-[200px] flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-400 mb-2'>Failed to load {symbol}</p>
          <p className='text-slate-500 text-sm'>Will retry in 1 minute</p>
        </div>
      </div>
    );
  }

  const isPositive = (coinData?.priceChange24h ?? 0) >= 0;

  return (
    <div className='w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-slate-600 overflow-hidden'>
      <div className='p-6'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-3'>
            <img src={coinData?.image || '/placeholder-coin.png'} alt={coinData?.name || 'Coin'} className='w-10 h-10' />
            <div>
              <h3 className='text-white font-bold text-xl'>{coinData?.symbol || 'N/A'}</h3>
              <p className='text-slate-400 text-sm'>{coinData?.name || 'Unknown'}</p>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className='mb-4'>
          <p className='text-white font-bold text-3xl mb-1'>
            ₱{(coinData?.currentPrice ?? 0).toLocaleString('en-PH', { maximumFractionDigits: 2 })}
          </p>
          <div className='flex items-center gap-2'>
            <p className={`text-lg font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{(coinData?.priceChange24h ?? 0).toFixed(2)}%
            </p>
            <span className='text-slate-500 text-sm'>24h</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-2 gap-4 pt-4 border-t border-slate-700'>
          <div>
            <p className='text-slate-400 text-xs mb-1'>24h Volume</p>
            <p className='text-white font-semibold text-sm'>
              ₱{((coinData?.volume24h ?? 0) / 1e9).toFixed(2)}B
            </p>
          </div>
          <div className='text-right'>
            <p className='text-slate-400 text-xs mb-1'>Market Cap</p>
            <p className='text-white font-semibold text-sm'>
              ₱{((coinData?.marketCap ?? 0) / 1e9).toFixed(2)}B
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main CryptoTracker Component
const CryptoTracker = () => {
  const [coinsData, setCoinsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const coins = [
    { id: COIN_IDS.BTC, symbol: 'BTC' },
    { id: COIN_IDS.ETH, symbol: 'ETH' },
    { id: COIN_IDS.MATIC, symbol: 'MATIC' },
    { id: COIN_IDS.BNB, symbol: 'BNB' },
    { id: COIN_IDS.XRP, symbol: 'XRP' },
    { id: COIN_IDS.SOL, symbol: 'SOL' },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(false);

      try {
        // Fetch all coin prices in ONE request
        const coinIds = coins.map(c => c.id);
        const pricesData = await getMultipleCoinsData(coinIds, 'php');

        // Transform data for each coin
        const transformedData = {};
        coins.forEach(coin => {
          const priceData = pricesData[coin.id];
          if (priceData) {
            const transformed = transformCoinData(coin.id, priceData, 'php');
            transformedData[coin.id] = transformed;
            console.log(`${coin.symbol}: ₱${transformed.currentPrice.toLocaleString('en-PH')}`);
          } else {
            console.warn(`No data for ${coin.symbol}`);
          }
        });
        setCoinsData(transformedData);
        console.log('✓ All coin data loaded successfully!');

      } catch (err) {
        console.error('✗ Failed to fetch crypto data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    // Refresh every 1 minute
    const interval = setInterval(fetchAllData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full p-6'>
      <div className='w-full max-w-full'>
        <div className='flex items-center gap-3 mb-8'>
          <div className='w-1 h-12 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full' />
          <h1 className='text-3xl sm:text-4xl font-bold text-[var(--primary-color)]'>
            Crypto Price Tracker
          </h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {coins.map((coin) => (
            <CryptoCard
              key={coin.id}
              coinId={coin.id}
              symbol={coin.symbol}
              coinData={coinsData[coin.id]}
              loading={loading}
              error={error && !coinsData[coin.id]}
            />
          ))}
        </div>

        <div className='mt-8 text-center text-slate-400 text-sm'>
          <p>
            Powered by CoinGecko • Real-time prices in PHP • Updates every minute
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoTracker;