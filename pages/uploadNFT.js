import { useContext } from 'react';
import Style from '../styles/uploadNFT.module.css';
import { UploadNFT } from '../uploadNFT/UploadNFTIndex';
import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';
import { useTranslation } from 'react-i18next';

const uploadNFT = () => {
    const { uploadIPFS, createNFT } = useContext(NFTMarketplaceContext);
    const { t } = useTranslation();

    return (
        <div className={Style.uploadNFT}>
            <div className={Style.uploadNFT_box}>
                <div className='flex flex-row gap-3'>
                    <div className='w-1 h-16 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full' />
                    <div className='flex-col'>
                        <h1 className='text-4xl font-bold text-[var(--primary-color)]'>
                            {t('pages.uploadNft.h1')}
                        </h1>
                        <p>{t('pages.uploadNft.h1.paragraph')}</p>
                    </div>
                </div>
                <div className='flex flex-col mt-4'>
                    <h2 className='text-2xl font-bold text-[var(--primary-color)]'>
                        {t('pages.uploadNft.image.h2')}
                    </h2>
                    <p>{t('pages.uploadNft.image.paragraph')}</p>
                </div>
                <div className={Style.uploadNFT_box_form}>
                    <UploadNFT
                        uploadIPFS={uploadIPFS}
                        createNFT={createNFT}
                    />
                </div>
            </div>
        </div>
    );
};

export default uploadNFT;
