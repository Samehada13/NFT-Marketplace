import React, { useContext } from 'react';
import { NFTMarketplaceContext } from '../../context/NFTMarketplaceContext';
import Toast from './Toast';
import Style from './Toast.module.css';

const ToastContainer = () => {
    const { toasts, removeToast } = useContext(NFTMarketplaceContext);

    if (!toasts || toasts.length === 0) return null;

    return (
        <div className={Style.toast_container}>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                    duration={toast.duration}
                />
            ))}
        </div>
    );
};

export default ToastContainer;
