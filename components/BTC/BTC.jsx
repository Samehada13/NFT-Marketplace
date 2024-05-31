import React, {useEffect} from 'react'

import Style from './BTC.module.css'

const BTC = () => {
    useEffect(() => {
        const lcwScript = document.createElement('script');
        lcwScript.src = 'https://www.livecoinwatch.com/static/lcw-widget.js';
        lcwScript.defer = true;
        document.body.appendChild(lcwScript);
    
        return () => {
          document.body.removeChild(lcwScript);
        };
      }, []);
    
      return (
        <div className={Style.btc}>
            <div className={Style.btc_box}>
                <div
                    class="livecoinwatch-widget-1" 
                    lcw-coin="BTC" 
                    lcw-base="PHP" 
                    lcw-secondary="BTC" 
                    lcw-period="d" 
                    lcw-color-tx="#ffffff" 
                    lcw-color-pr="#58c7c5" 
                    lcw-color-bg="#1f2434" 
                    lcw-border-w="1" 
                    lcw-digits="9" 
                    className={Style.btc_box_info}>
                </div>
                <div 
                    class="livecoinwatch-widget-1" 
                    lcw-coin="ETH" 
                    lcw-base="PHP" 
                    lcw-secondary="ETH" 
                    lcw-period="d" 
                    lcw-color-tx="#ffffff" 
                    lcw-color-pr="#58c7c5" 
                    lcw-color-bg="#1f2434" 
                    lcw-border-w="1" 
                    lcw-digits="8" 
                    className={Style.btc_box_info}>
                </div>
                <div 
                    class="livecoinwatch-widget-1" 
                    lcw-coin="MATIC" 
                    lcw-base="PHP" 
                    lcw-secondary="MATIC" 
                    lcw-period="d" 
                    lcw-color-tx="#ffffff" 
                    lcw-color-pr="#58c7c5" 
                    lcw-color-bg="#1f2434" 
                    lcw-border-w="1" 
                    lcw-digits="4" 
                    className={Style.btc_box_info}>
                </div>
                <div
                    class="livecoinwatch-widget-1" 
                    lcw-coin="BNB" 
                    lcw-base="PHP" 
                    lcw-secondary="BNB" 
                    lcw-period="d" 
                    lcw-color-tx="#ffffff" 
                    lcw-color-pr="#58c7c5" 
                    lcw-color-bg="#1f2434" 
                    lcw-border-w="1" 
                    lcw-digits="9" 
                    className={Style.btc_box_info}>
                </div>
                <div 
                    class="livecoinwatch-widget-1" 
                    lcw-coin="XRP" 
                    lcw-base="PHP" 
                    lcw-secondary="XRP" 
                    lcw-period="d" 
                    lcw-color-tx="#ffffff" 
                    lcw-color-pr="#58c7c5" 
                    lcw-color-bg="#1f2434" 
                    lcw-border-w="1" 
                    lcw-digits="8" 
                    className={Style.btc_box_info}>
                </div>
                <div 
                    class="livecoinwatch-widget-1" 
                    lcw-coin="SOL" 
                    lcw-base="PHP" 
                    lcw-secondary="SOL" 
                    lcw-period="d" 
                    lcw-color-tx="#ffffff" 
                    lcw-color-pr="#58c7c5" 
                    lcw-color-bg="#1f2434" 
                    lcw-border-w="1" 
                    lcw-digits="4" 
                    className={Style.btc_box_info}>
                </div>
            </div>
        </div>
        
        
        
      );
  }

export default BTC