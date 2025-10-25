import { useEffect } from 'react';

const CryptoTracker = () => {
  useEffect(() => {
    // Load LiveCoinWatch widget script
    const lcwScript = document.createElement('script');
    lcwScript.src = 'https://www.livecoinwatch.com/static/lcw-widget.js';
    lcwScript.defer = true;
    document.body.appendChild(lcwScript);

    return () => {
      if (document.body.contains(lcwScript)) {
        document.body.removeChild(lcwScript);
      }
    };
  }, []);

  return (
    <div className='p-6 overflow-x'>
      <div className=''>
        <h1 className='text-3xl sm:text-4xl font-bold text-[var(--primary-color)] text-center mb-8'>
          Crypto Price Tracker
        </h1>

        <div className='flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {/* Bitcoin */}
          <div className='flex-shrink-0 w-[393px] snap-start'>
            <div className='bg-amber-200/50 rounded-lg shadow-sm hover:shadow-md border border-amber-200 overflow-hidden h-full'>
              <div
                className='livecoinwatch-widget-1'
                lcw-coin='BTC'
                lcw-base='PHP'
                lcw-secondary='BTC'
                lcw-period='d'
                lcw-color-tx='#ffffff'
                lcw-color-pr='#58c7c5'
                lcw-color-bg='#1f2434'
                lcw-border-w='0'
                lcw-digits='9'
              />
            </div>
          </div>

          {/* Ethereum */}
          <div className='flex-shrink-0 w-[393px] snap-start'>
            <div className='bg-amber-200/50 rounded-lg shadow-sm hover:shadow-md border border-amber-200 overflow-hidden h-full'>
              <div
                className='livecoinwatch-widget-1'
                lcw-coin='ETH'
                lcw-base='PHP'
                lcw-secondary='ETH'
                lcw-period='d'
                lcw-color-tx='#ffffff'
                lcw-color-pr='#58c7c5'
                lcw-color-bg='#1f2434'
                lcw-border-w='0'
                lcw-digits='8'
              />
            </div>
          </div>

          {/* Polygon (MATIC) */}
          <div className='flex-shrink-0 w-[393px] snap-start'>
            <div className='bg-amber-200/50 rounded-lg shadow-sm hover:shadow-md border border-amber-200 overflow-hidden h-full'>
              <div
                className='livecoinwatch-widget-1'
                lcw-coin='MATIC'
                lcw-base='PHP'
                lcw-secondary='MATIC'
                lcw-period='d'
                lcw-color-tx='#ffffff'
                lcw-color-pr='#58c7c5'
                lcw-color-bg='#1f2434'
                lcw-border-w='0'
                lcw-digits='4'
              />
            </div>
          </div>

          {/* Binance Coin */}
          <div className='flex-shrink-0 w-[393px] snap-start'>
            <div className='bg-amber-200/50 rounded-lg shadow-sm hover:shadow-md border border-amber-200 overflow-hidden h-full'>
              <div
                className='livecoinwatch-widget-1'
                lcw-coin='BNB'
                lcw-base='PHP'
                lcw-secondary='BNB'
                lcw-period='d'
                lcw-color-tx='#ffffff'
                lcw-color-pr='#58c7c5'
                lcw-color-bg='#1f2434'
                lcw-border-w='0'
                lcw-digits='9'
              />
            </div>
          </div>

          {/* Ripple */}
          <div className='flex-shrink-0 w-[393px] snap-start'>
            <div className='bg-amber-200/50 rounded-lg shadow-sm hover:shadow-md border border-amber-200 overflow-hidden h-full'>
              <div
                className='livecoinwatch-widget-1'
                lcw-coin='XRP'
                lcw-base='PHP'
                lcw-secondary='XRP'
                lcw-period='d'
                lcw-color-tx='#ffffff'
                lcw-color-pr='#58c7c5'
                lcw-color-bg='#1f2434'
                lcw-border-w='0'
                lcw-digits='8'
              />
            </div>
          </div>

          {/* Solana */}
          <div className='flex-shrink-0 w-[393px] snap-start'>
            <div className='bg-amber-200/50 rounded-lg shadow-sm hover:shadow-md border border-amber-200 overflow-hidden h-full'>
              <div
                className='livecoinwatch-widget-1'
                lcw-coin='SOL'
                lcw-base='PHP'
                lcw-secondary='SOL'
                lcw-period='d'
                lcw-color-tx='#ffffff'
                lcw-color-pr='#58c7c5'
                lcw-color-bg='#1f2434'
                lcw-border-w='0'
                lcw-digits='4'
              />
            </div>
          </div>
        </div>

        <div className='mt-8 text-center text-slate-900 text-sm'>
          <p>
            Powered by LiveCoinWatch • Real-time prices in PHP • Scroll
            horizontally →
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoTracker;
