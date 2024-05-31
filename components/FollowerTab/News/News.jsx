import React, { useEffect } from 'react';

const NewsComponent = () => {
  useEffect(() => {
    // This function initializes the CryptoHopper widget
    const initializeCryptoHopperWidget = () => {
      if (typeof window.initializeWidget === 'function') {
        window.initializeWidget('500', false, '0', 'f93', 'f93', 'e57300', '777', '495');
      }
    };

    // Load the CryptoHopper widget when the component mounts
    const script = document.createElement('script');
    script.src = 'https://www.cryptohopper.com/widgets/js/script';
    script.async = true;
    script.onload = initializeCryptoHopperWidget;

    document.head.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ width: '60%', textAlign: 'center', marginLeft: '20rem' }}>
      <div
        className="cryptohopper-web-widget"
        data-id="5"
        style={{ display: 'inline-block', textAlign: 'left' }}
      ></div>
    </div>
  );
};

export default NewsComponent;
