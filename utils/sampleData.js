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

const nftsaleImages = [
    nftsale1,
    nftsale2,
    nftsale3,
    nftsale4,
    nftsale5,
    nftsale6,
    nftsale7,
    nftsale8,
];

// Static sample NFT data for consistent display
const STATIC_SAMPLE_NFTS = [
    {
        name: 'Cosmic Dreamer #1',
        price: '0.5',
        category: 'Digital Painting',
        daysAgo: 1,
        rarity: 'Epic',
        color: 'Purple',
    },
    {
        name: 'Neon Genesis #2',
        price: '1.2',
        category: 'CGI Art',
        daysAgo: 2,
        rarity: 'Legendary',
        color: 'Blue',
    },
    {
        name: 'Pixel Kingdom #3',
        price: '0.3',
        category: 'Pixel Art',
        daysAgo: 3,
        rarity: 'Rare',
        color: 'Green',
    },
    {
        name: 'Abstract Mind #4',
        price: '0.8',
        category: 'Digital Collage',
        daysAgo: 5,
        rarity: 'Epic',
        color: 'Red',
    },
    {
        name: 'Cyber Punk #5',
        price: '2.0',
        category: 'Concept Art',
        daysAgo: 6,
        rarity: 'Legendary',
        color: 'Yellow',
    },
    {
        name: 'Digital Sunset #6',
        price: '0.4',
        category: 'Digital Photography',
        daysAgo: 8,
        rarity: 'Common',
        color: 'Purple',
    },
    {
        name: 'Anime Hero #7',
        price: '1.5',
        category: 'Anime Art',
        daysAgo: 10,
        rarity: 'Rare',
        color: 'Blue',
    },
    {
        name: 'AI Vision #8',
        price: '0.9',
        category: 'AI-Generated Art',
        daysAgo: 12,
        rarity: 'Epic',
        color: 'Green',
    },
    {
        name: 'Vector Dreams #9',
        price: '0.6',
        category: 'Vector Art',
        daysAgo: 14,
        rarity: 'Uncommon',
        color: 'Red',
    },
    {
        name: 'Photo Fusion #10',
        price: '1.1',
        category: 'Photobashing',
        daysAgo: 16,
        rarity: 'Rare',
        color: 'Yellow',
    },
    {
        name: 'Galaxy Explorer #11',
        price: '3.0',
        category: 'CGI Art',
        daysAgo: 18,
        rarity: 'Legendary',
        color: 'Purple',
    },
    {
        name: 'Retro Wave #12',
        price: '0.7',
        category: 'Digital Painting',
        daysAgo: 20,
        rarity: 'Epic',
        color: 'Blue',
    },
    {
        name: 'Nature Spirit #13',
        price: '0.5',
        category: 'Digital Photography',
        daysAgo: 22,
        rarity: 'Rare',
        color: 'Green',
    },
    {
        name: 'Mecha Warrior #14',
        price: '1.8',
        category: 'Anime Art',
        daysAgo: 24,
        rarity: 'Epic',
        color: 'Red',
    },
    {
        name: 'Digital Eden #15',
        price: '2.5',
        category: 'Concept Art',
        daysAgo: 26,
        rarity: 'Legendary',
        color: 'Yellow',
    },
];

// Generate static sample NFT data
export const generateSampleNFTs = (count = 15) => {
    const now = new Date();

    return STATIC_SAMPLE_NFTS.slice(0, count).map((item, i) => {
        const timestamp = new Date(now);
        timestamp.setDate(timestamp.getDate() - item.daysAgo);

        return {
            price: ethers.utils.parseEther(item.price).toString(),
            tokenId: i + 1,
            seller: `0x${(1000 + i).toString(16).padStart(40, '0')}`,
            owner: `0x${(2000 + i).toString(16).padStart(40, '0')}`,
            image: nftsaleImages[i % 8],
            name: item.name,
            description: `A beautiful NFT from the collection`,
            website: 'https://example.com',
            category: item.category,
            royalties: '5.00',
            fileSize: '2.5 MB',
            properties: {
                rarity: item.rarity,
                color: item.color,
            },
            timestamp: Math.floor(timestamp.getTime() / 1000),
            creator: `0x${(3000 + i).toString(16).padStart(40, '0')}`,
            tokenURI: `ipfs://QmSample${i + 1}`,
            isSampleData: true,
        };
    });

};

// Export static array for direct use
export const sampleNFTs = generateSampleNFTs(15);
