// Utility to fetch cryptocurrency data from CoinGecko API
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Fetch multiple coins data in a single request (more efficient, avoids rate limits)
 * @param {Array<string>} coinIds - Array of CoinGecko coin IDs
 * @param {string} vsCurrency - Currency to compare against
 * @returns {Promise<Object>} Object with coin data keyed by coin ID
 */
export const getMultipleCoinsData = async (coinIds, vsCurrency = 'php') => {
    try {
        const idsString = coinIds.join(',');
        const response = await fetch(
            `${COINGECKO_BASE_URL}/simple/price?ids=${idsString}&vs_currencies=${vsCurrency}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched all coins:', data);
        return data;
    } catch (error) {
        console.error('Error fetching multiple coins:', error);
        return {};
    }
};

/**
 * Get coin image URL from CoinGecko
 */
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

/**
 * Fetch historical chart data for a cryptocurrency
 * @param {string} coinId - CoinGecko coin ID
 * @param {string} vsCurrency - Currency to compare against
 * @param {number} days - Number of days of historical data
 * @returns {Promise<Array>} Array of {time, price} objects
 */
export const getCoinChartData = async (coinId, vsCurrency = 'php', days = 7) => {
    try {
        const response = await fetch(
            `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Transform data to array of {time, price} objects
        return data.prices.map(([timestamp, price]) => ({
            time: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: price,
        }));
    } catch (error) {
        console.error(`Error fetching chart data for ${coinId}:`, error);
        return [];
    }
};

/**
 * Transform simple price data to match our component format
 */
export const transformCoinData = (coinId, priceData, vsCurrency = 'php') => {
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

// Map of coin symbols to CoinGecko IDs
export const COIN_IDS = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    MATIC: 'matic-network',
    BNB: 'binancecoin',
    XRP: 'ripple',
    SOL: 'solana',
};
