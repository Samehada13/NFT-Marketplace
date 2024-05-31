
// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import moment from 'moment';
// import 'chartjs-adapter-moment';
// import { getDateAndPriceOfListedNFTs } from './TopCreators';

// const ScatterPlot = ({ nfts }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     // Convert the NFTs data to the format expected by Chart.js
//     const chartData = getDateAndPriceOfListedNFTs(nfts);

//     const data = {
//       datasets: [
//         {
//           label: '',
//           data: chartData.map(({ timestamp, price }) => ({ x: moment(timestamp), y: price })),
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           borderColor: 'black',
//           pointBackgroundColor: 'white',
//           pointRadius: 5,
//         },
//       ],
//     };

//     const options = {
//       scales: {
//         x: {
//           type: 'time',
//           position: 'bottom',
//           time: {
//             unit: 'Hour', // or 'second' based on your preference
//             displayFormats: {
//               minute: 'MMM D, YYYY HH:mm', // Customize the display format
//             },
//           },
//           ticks: {
//             color: 'white',
//           },
//         },
//         y: {
//           type: 'linear',
//           position: 'left',
//           ticks: {
//             color: 'white',
//           },
//         },
//       },
//     };

//     const ctx = chartRef.current.getContext('2d');
//     const scatterChart = new Chart(ctx, {
//       type: 'scatter',
//       data: data,
//       options: options,
//     });

//     return () => scatterChart.destroy();
//   }, [nfts]);

//   return (
//     <div style={{ backgroundColor: '#5EBEC4', color: 'white', padding: '20px', width: '100%', marginTop: 0 }}>
//       <canvas ref={chartRef} width={600} height={300} />
//     </div>
//   );
// };

// export default ScatterPlot;

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-moment';
import { getDateAndPriceOfListedNFTs } from './TopCreators';

const ScatterPlot = ({ nfts }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Convert the NFTs data to the format expected by Chart.js
    const chartData = getDateAndPriceOfListedNFTs(nfts);

    const data = {
      datasets: [
        {
          label: '',
          data: chartData.map(({ timestamp, price }) => ({ x: moment(timestamp), y: price })),
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderColor: 'black',
          pointBackgroundColor: 'white',
          pointRadius: 5,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          type: 'time',
          position: 'bottom',
          time: {
            unit: 'Hour', // or 'second' based on your preference
            displayFormats: {
              minute: 'MMM D, YYYY HH:mm', // Customize the display format
            },
          },
          ticks: {
            color: 'white',
          },
        },
        y: {
          type: 'linear',
          position: 'left',
          ticks: {
            color: 'white',
          },
        },
      },
    };

    const ctx = chartRef.current.getContext('2d');
    const scatterChart = new Chart(ctx, {
      type: 'scatter',
      data: data,
      options: options,
    });

    return () => scatterChart.destroy();
  }, [nfts]);

  return (
    <div style={{ backgroundColor: '#5EBEC4', color: 'white', padding: '20px', width: '100%', height: '300px', marginTop: 0 }}>
      <canvas ref={chartRef} width={600} height={300} />
    </div>
  );
};

export default ScatterPlot;
