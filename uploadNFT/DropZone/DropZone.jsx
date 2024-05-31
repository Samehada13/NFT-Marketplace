import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import styles from './DropZone.module.css';
import img from '../../img';

import { useTranslation } from 'react-i18next';

const DropZone = React.forwardRef(({ title, heading, subHeading, name, website, description, royalties, fileSize, category, properties, price, uploadIPFS, setImage }, ref) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadIPFS(acceptedFile[0]);
    setFileUrl(url);
    setImage(url);
    console.log(url);
  }, [uploadIPFS, setImage]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const { t } = useTranslation();

  return (
    <div ref={ref} className={styles.dropZone}>
      <div {...getRootProps()} className={styles.dropZoneBox}>
        <input {...getInputProps()} />
        <div className={styles.dropZoneBoxInput}>
          <p className={styles.dropZoneBoxTitle}>{title}</p>
          <div className={styles.dropZoneBoxImage}>
            <Image 
              src={img.upload} 
              alt="Upload" 
              width={100} 
              height={100} 
              objectFit="contain" 
            />
          </div>
          <p className={styles.dropZoneBoxHeading}>{heading}</p>
          <p className={styles.dropZoneBoxSubHeading}>{subHeading}</p>
        </div>
      </div>
      {fileUrl && (
        <aside className={styles.dropZoneAside}>
          <div className={styles.dropZoneAsideBox}>
          <div style={{ width: '100%', height: '100%' }}>
            <Image 
              src={fileUrl} 
              alt="NFT image" 
              width={300} 
              height={360} 
            />
          </div>

            <div className={styles.dropZoneAsideBoxPreview}>
              <div className={styles.dropZoneAsideBoxPreviewItem}>
                <p><span><b>{t('pages.uploadNft.uploadNft.dropZone.dropZone.name')}</b></span>&nbsp;{name || ''}</p>
                <p><span><b>Website:</b></span>&nbsp;{website || ''}</p>
              </div>
              <div className={styles.dropZoneAsideBoxPreviewItem}>
                <p><span><b>{t('pages.uploadNft.uploadNft.dropZone.dropZone.description')}</b></span>&nbsp;{description || ''}</p>
              </div>
              <div className={styles.dropZoneAsideBoxPreviewItem}>
                <p><span><b>{t('pages.uploadNft.uploadNft.dropZone.dropZone.category')}</b></span>&nbsp;{category || ''}</p>
                <p><span><b>{t('pages.uploadNft.uploadNft.dropZone.dropZone.royalties')}</b></span>&nbsp;{royalties || ''} %</p>
                <p><span><b>{t('pages.uploadNft.uploadNft.dropZone.dropZone.fileSize')}</b></span>&nbsp;{fileSize || ''} MB</p>
                <p><span><b>{t('pages.uploadNft.uploadNft.dropZone.dropZone.properties')}</b></span>&nbsp;{properties || ''}</p>
                <p><span><b>{t('pages.uploadNft.uploadNft.dropZone.dropZone.price')}</b></span>&nbsp;{price || ''} Matic</p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
});

export default DropZone;
