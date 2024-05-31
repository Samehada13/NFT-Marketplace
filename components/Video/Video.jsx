// import React from 'react';
// import Image from 'next/image';

// import { useTranslation } from 'react-i18next';

// import Style from './Video.module.css';
// import image from '../../img';

// const Video = () => {

//     const { t } = useTranslation();

//   return (
//     <div className={Style.video}>
//         <div className={Style.video_box}>
//             <h1>
//                 <span>🎬</span>{t('pages.home.video.tv')}
//             </h1>
//             <p>
//                 {t('pages.home.video.checkOut')}
//             </p>
//             <div className={Style.video_box_frame}>
//                 <div className={Style.video_box_frame_left}>
//                     <Image className={Style.video_box_frame_left_img} src={image.nftvideo} alt="Video Image" height={1080} width={1920} objectFit="Cover"/>
//                 </div>
//                 <div className={Style.video_box_frame_right}></div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Video

import React from 'react';
import { useTranslation } from 'react-i18next';

import Style from './Video.module.css';
import image from '../../img';

const Video = () => {
    const { t } = useTranslation();

    return (
        <div className={Style.video}>
            <div className={Style.video_box}>
                <h1>
                    <span>🎬</span>{t('pages.home.video.tv')}
                </h1>
                <p>
                    Check out our hottest video
                </p>
                <div className={Style.video_box_frame}>
                    <div className={Style.video_box_frame_right}></div>
                    <div className={Style.video_box_frame_left}>
                        <iframe
                            title="YouTube Video"
                            className={Style.video_box_frame_left_img} // Apply the same class as the Image component
                            src="https://www.youtube.com/embed/Axcm4NLMYms"
                            allowFullScreen
                            height={500} width={1120} objectFit="Cover"
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Video;

