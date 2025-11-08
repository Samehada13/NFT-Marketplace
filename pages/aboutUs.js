import Image from 'next/image';
import image from '../img';
import Logo from '../public/GABR-text-logo.svg';

const AboutUs = () => {
  const founderArray = [
    { name: 'Ruben Balon', position: 'Founder', images: image.user2 },
    { name: ' ', position: 'Co-Founder', images: image.user4 },
    { name: ' ', position: 'Chairman', images: image.user5 },
    { name: ' ', position: 'Programmer', images: image.user7 },
    { name: ' ', position: 'Designer', images: image.user8 },
    { name: ' ', position: 'Software Engineer', images: image.user9 },
    { name: ' ', position: 'Operations', images: image.user10 },
    { name: ' ', position: 'Producer', images: image.user3 },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <div className='max-w-7xl mx-auto px-6 py-16 lg:py-24'>
        {/* Hero Section */}
        <div className='grid lg:grid-cols-5 gap-12 items-center mb-24'>
          <div className='lg:col-span-3 space-y-6'>
            <div className='flex flex-row items-center gap-3'>
              <div className='w-1 h-16 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full' />
              <h1 className='text-5xl lg:text-6xl font-bold text-slate-900 leading-tight'>
                About NFT MArketplace
              </h1>
            </div>
            <p className='text-lg text-slate-600 leading-relaxed text-justify'>
              An NFT (Non-Fungible Token) marketplace allows users to purchase,
              sell, and exchange digital assets represented by NFTs. NFTs are
              distinct digital tokens that are frequently used to indicate
              ownership or authenticity of digital goods like art, music, films,
              virtual real estate, collectibles, and so on. In an NFT
              marketplace, creators convert their digital works into NFTs and
              attach information defining their uniqueness and ownership rights.
              These NFTs are then placed on the market for sale or auction.
              Buyers may explore the ads, make bids, and buy NFTs with
              cryptocurrency, usually Ethereum or other blockchain-based
              currencies. This platform was designed primarily for graphic
              designers in the Bicol Region but may also be used to trade
              outside of the region. This platform was created to support a
              student's undergraduate research.
            </p>
          </div>

          <div className='lg:col-span-2'>
            <div className='aspect-square rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1'>
              <div className='w-full h-full rounded-3xl bg-white flex items-center justify-center'>
                <div className='text-center p-8'>
                  <div className='w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center'>
                    <Image src={Logo} alt='logo' width={120} height={120}/>
                  </div>
                  <h3 className='text-2xl font-bold text-slate-900 mb-2'>
                    NFT Platform
                  </h3>
                  <p className='text-slate-600'>Digital Marketplace</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className='mb-24'>
          <div className='mb-12'>
            <div className='flex flex-row items-center gap-3'>
              <div className='w-1 h-24 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full' />
              <div className='flex flex-col'>
                <h2 className='text-4xl lg:text-5xl font-bold text-slate-900 mb-4'>
                  Team
                </h2>
                <p className='text-xl text-slate-600'>
                  Building an NFT marketplace is really hard. But with the help
                  of a very talented team, it is easy to oversee this kind of
                  project.
                </p>
              </div>
            </div>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {founderArray.map((el, i) => (
              <div
                key={i}
                className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1'
              >
                <div className='aspect-square relative'>
                  <Image
                    src={el.images}
                    alt={el.name}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-slate-900 text-center mb-2'>
                    {el.name}
                  </h3>
                  <p className='text-slate-600 text-center'>{el.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fast Facts Section */}
        <div className='mb-12'>
          <div className='flex flex-row items-center gap-3 py-2'>
            <div className='w-1 h-16 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full' />
            <div className='flex flex-col'>
              <h2 className='text-4xl lg:text-5xl font-bold text-slate-900'>
                Fast Fact
              </h2>
            </div>
          </div>
          <div className='space-y-4'>
            <p className='text-xl text-slate-600'>
              The NFT market is now worth more than $40 billion, and valuations
              keep rising.
            </p>
            <p className='text-xl text-slate-600'>
              The most expensive NFT either sold for $532 million or $91.8
              million.
            </p>
            <p className='text-xl text-slate-600'>
              Thousands of NFT sales happen per day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
