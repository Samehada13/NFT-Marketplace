import { ethers } from 'ethers';

// Import NFT sale images
import nftsale1 from '../img/nftsale1.png';
import nftsale2 from '../img/nftsale2.png';
import nftsale3 from '../img/nftsale3.png';
import nftsale4 from '../img/nftsale4.png';
import nftsale5 from '../img/nftsale5.png';
import nftsale6 from '../img/nftsale6.png';
import nftsale7 from '../img/nftsale7.png';
import nftsale8 from '../img/nftsale8.png';

const nftsaleImages = [nftsale1, nftsale2, nftsale3, nftsale4, nftsale5, nftsale6, nftsale7, nftsale8];

// Generate sample NFT data for testing charts
export const generateSampleNFTs = (count = 20) => {
  const categories = ['Digital Painting', 'Digital Photography', 'CGI Art', 'Anime Art', 'Digital Collage', 'Pixel Art', 'Concept Art', 'AI-Generated Art', 'Photobashing', 'Vector Art'];
  const names = [
    'Digital Dream', 'Crypto Art #', 'Pixel Punks ', 'Ethereal ', 'Blockchain Beauty ',
    'NFT Masterpiece ', 'Digital Wonder ', 'Crypto Gem ', 'Art Block ', 'Tokenized Art '
  ];

  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const sampleNFTs = [];

  for (let i = 0; i < count; i++) {
    const basePrice = Math.random() * 5 + 0.1; // Between 0.1 and 5.1 ETH
    const price = basePrice.toFixed(4);
    const randomDaysAgo = Math.floor(Math.random() * 365); // Random day in the past year
    const timestamp = new Date(oneYearAgo);
    timestamp.setDate(timestamp.getDate() + randomDaysAgo);

    sampleNFTs.push({
      price: ethers.utils.parseEther(price.toString()).toString(), // Convert to wei string
      tokenId: i + 1,
      seller: `0x${Math.random().toString(16).substr(2, 40)}`,
      owner: `0x${Math.random().toString(16).substr(2, 40)}`,
      image: nftsaleImages[i % 8],
      name: `${names[i % names.length]}${i + 1}`,
      description: `A beautiful NFT created on ${timestamp.toLocaleDateString()}`,
      website: 'https://example.com',
      category: categories[Math.floor(Math.random() * categories.length)],
      royalties: (Math.random() * 10).toFixed(2),
      fileSize: `${(Math.random() * 10 + 1).toFixed(2)} MB`,
      properties: {
        rarity: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 5)],
        color: ['Red', 'Blue', 'Green', 'Yellow', 'Purple'][Math.floor(Math.random() * 5)],
      },
      timestamp: Math.floor(timestamp.getTime() / 1000), // Convert to Unix timestamp (seconds)
      creator: `0x${Math.random().toString(16).substr(2, 40)}`,
      tokenURI: `ipfs://QmXx...${Math.random().toString(16).substr(2, 10)}`
    });
  }

  // Sort by timestamp
  return sampleNFTs.sort((a, b) => a.timestamp - b.timestamp);
};

// Sample data for testing
export const sampleNFTs = [
  {
    price: ethers.utils.parseEther('0.1').toString(),
    tokenId: 1,
    seller: '0x1234...',
    owner: '0x5678...',
    image: nftsale1,
    name: 'Digital Dream #1',
    description: 'A beautiful digital artwork',
    website: 'https://example.com',
    category: 'Art',
    royalties: '5.00',
    fileSize: '2.5 MB',
    properties: {
      rarity: 'Rare',
      color: 'Blue'
    },
    timestamp: Math.floor(new Date('2023-01-15').getTime() / 1000),
    creator: '0x90ab...',
    tokenURI: 'ipfs://QmXx...123'
  },
  // Add more sample items as needed
];
