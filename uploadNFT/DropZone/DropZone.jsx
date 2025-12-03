import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Lottie from 'lottie-react';
import styles from './DropZone.module.css';
import img from '../../img';

const DropZone = React.forwardRef(({
  title,
  heading,
  subHeading,
  uploadIPFS,
  setImage,
  image
}, ref) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Reset fileUrl when image is set to null (e.g., when reset button is clicked)
  useEffect(() => {
    if (image === null) {
      setFileUrl(null);
    }
  }, [image]);

  const onDrop = useCallback(async (acceptedFile) => {
    setIsUploading(true);
    try {
      const url = await uploadIPFS(acceptedFile[0]);
      setFileUrl(url);
      setImage(url);
      console.log(url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  }, [uploadIPFS, setImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });



  return (
    <div ref={ref} className={styles.dropZone}>
      {!fileUrl && !isUploading && (
        <div {...getRootProps()} className={`${styles.dropZoneBox} ${isDragActive ? styles.dragActive : ''}`}>
          <input {...getInputProps()} />
          <div className={styles.dropZoneContent}>
            <div className={styles.dropZoneBoxImage}>
              <Image
                src={img.upload}
                alt="Upload"
                width={100}
                height={100}
                objectFit="contain"
              />
            </div>
            <div className={styles.dropZoneText}>
              <p className={styles.dropZoneHeading}>{heading}</p>
              <p className={styles.dropZoneSubheading}>{subHeading}</p>
            </div>
          </div>
        </div>
      )}

      {/* LOADING STATE WITH LOTTIE */}
      {isUploading && (
        <div className={styles.dropZoneLoading}>
          <Lottie
            animationData={img.Loader}
            loop={true}
            style={{ width: 150, height: 150 }}
          />
          <p className={styles.loadingText}>Uploading...</p>
        </div>
      )}

      {/* SIMPLE IMAGE PREVIEW */}
      {fileUrl && !isUploading && (
        <div className={styles.dropZonePreview}>
          <div className={styles.previewSuccess}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Image Uploaded Successfully</span>
          </div>
          <img src={fileUrl} alt="NFT Preview" className={styles.previewImage} />
        </div>
      )}
    </div>
  );
});

export default DropZone;
