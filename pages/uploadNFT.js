import { useContext } from 'react';
import Style from '../styles/uploadNFT.module.css';
import { UploadNFT } from '../uploadNFT/UploadNFTIndex';
import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';

const uploadNFT = () => {
    const { uploadIPFS, createNFT } = useContext(NFTMarketplaceContext);

    return (
        <div className={Style.uploadNFT}>
            <UploadNFT
                uploadIPFS={uploadIPFS}
                createNFT={createNFT}
            />
        </div>
    );
};

export default uploadNFT;
