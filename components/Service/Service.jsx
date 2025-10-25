import Image from 'next/image';
import image from '../../img';
import { useTranslation } from 'react-i18next';
import Step1 from '../../public/Step1.png';
import Step2 from '../../public/Step2.png';
import Step3 from '../../public/Step3.png';
import Step4 from '../../public/Step4.jpg';
const Service = () => {
  const { t } = useTranslation();

  const ServiceItem = ({ img, alt, step, title, description }) => (
    <div className='flex flex-col items-center gap-8 p-4 bg-white rounded-lg duration-300 w-full md:w-auto'>
      <Image
        src={img}
        alt={alt}
        width={400}
        className='md:w-40 md:h-40 object-contain rounded-md'
        height={400}
      />
      <div className='flex flex-col items-center'>
        <h3 className='text-3xl primary-text font-semibold mb-2'>
          {title}
        </h3>
        <p className='text-gray-600 text-center'>{description}</p>
      </div>
      <p className='mb-4'>
        <span className='px-5 py-4 bg-[var(--primary-color)] text-white rounded-full text-sm font-medium'>
          {step}
        </span>
      </p>
    </div>
  );

  return (
    <div className='p-6 mx-auto min-h-[50vh] flex items-center'>
      <div className='flex flex-col md:flex-row justify-center items-center gap-8 w-full'>
        <ServiceItem
          img={Step1}
          alt={t('pages.home.service.box1')}
          step={t('pages.home.service.step1')}
          title={t('pages.home.service.wallet1')}
          description={t('pages.home.service.para1')}
        />
        <ServiceItem
          img={Step2}
          alt={t('pages.home.service.box2')}
          step={t('pages.home.service.step2')}
          title={t('pages.home.service.wallet2')}
          description={t('pages.home.service.para2')}
        />
        <ServiceItem
          img={Step3}
          alt={t('pages.home.service.box3')}
          step={t('pages.home.service.step3')}
          title={t('pages.home.service.wallet3')}
          description={t('pages.home.service.para3')}
        />
        <ServiceItem
          img={Step4}
          alt={t('pages.home.service.box4')}
          step={t('pages.home.service.step4')}
          title={t('pages.home.service.wallet4')}
          description={t('pages.home.service.para4')}
        />
      </div>
    </div>
  );
};

export default Service;
