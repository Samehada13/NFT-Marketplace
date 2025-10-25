import Image from 'next/image';
import { useRouter } from 'next/router';
import Style from './HeroSection.module.css';
import { Button } from '../componentIndex';
import HeroImage from '../../public/HeroSection.jpg';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <section
      className='h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-white text-center'
      style={{
        backgroundImage: `url(${HeroImage.src})`,
      }}
    >
      <div className='flex flex-col flex-1 justify-top items-top text-center gap-6'>
        <div className='py-6 pt-8 primary-text'>
          <h1 className='text-7xl font-bold whitespace-pre-line leading-[1.2] [word-spacing:0.2em] [&>br]:block [&>br]:h-4'>{t('pages.home.heroSection.h1')}</h1>
        </div>
        <Button className='mt-16 button-lg' 
        variant='accent'
        btnName={t('pages.home.heroSection.search')} 
        handleClick={()=> router.push('/searchPage')}/>
      </div>
      
    </section>
  );
};

export default Home;
