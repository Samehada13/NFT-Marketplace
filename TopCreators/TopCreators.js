

// export const getTopCreators  = (creators)=> {
//     const finalCreators = [];

//     const finalResults = creators.reduce((index, currentValue)=> {
//         (index[currentValue.seller] =index[currentValue.seller]|| []).push(currentValue);

//         return index;
//     }, {});
//     Object.entries(finalResults).forEach((item)=> {
//         const seller = item[0];
//         const total = item[1]
//         .map((newItem)=> Number(newItem.price))
//         .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

//         finalCreators.push({seller, total});
//     }); 

//     return finalCreators;
// }
export const getTopCreators = (creators) => {
    const finalCreators = creators.reduce((index, currentValue) => {
        (index[currentValue.seller] = index[currentValue.seller] || []).push(currentValue);
        return index;
    }, {});

    const sortedCreators = Object.entries(finalCreators)
        .map(([seller, items]) => {
            const total = items
                .map((newItem) => Number(newItem.price))
                .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

            return { seller, total };
        })
        .sort((a, b) => b.total - a.total);

    return sortedCreators;
};


export const getVolumeOfUser = (creators) => {
    // Return empty array if creators is not an array or is empty
    if (!Array.isArray(creators) || creators.length === 0) {
        return [];
    }

    const finalCreators = [];

    try {
        const finalResults = creators.reduce((index, currentValue) => {
            // Skip if currentValue is null/undefined or doesn't have seller property
            if (!currentValue || !currentValue.seller) return index;
            
            (index[currentValue.seller] = index[currentValue.seller] || []).push(currentValue);
            return index;
        }, {});

        Object.entries(finalResults).forEach(([seller, items]) => {
            const total = items
                .filter(item => item && item.price) // Filter out items without price
                .map(item => Number(item.price) || 0) // Convert to number, default to 0 if invalid
                .reduce((sum, price) => sum + price, 0);

            if (seller) { // Only push if seller exists
                finalCreators.push({ seller, total });
            }
        });
    } catch (error) {
        console.error('Error in getVolumeOfUser:', error);
        return [];
    }

    return finalCreators;
}

// export const getDateAndPriceOfListedNFTs = (nfts) => {
//     const result = [];
  
//     nfts.forEach((item) => {
//       const { timestamp, price} = item;
//       result.push({ timestamp, price: Number(price) });
//     });
  
//     return result;
//   };
export const getDateAndPriceOfListedNFTs = (nfts) => {
    const result = [];
  
    if (!Array.isArray(nfts)) {
      console.error('Invalid or undefined nfts:', nfts);
      return result;
    }
  
    nfts.forEach((item) => {
      const { timestamp, price } = item;
      result.push({ timestamp, price: Number(price) });
    });
  
    return result;
  };
  

  
  
  
  
    
  
  
