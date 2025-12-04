import React, { useEffect } from 'react';
import Style from './Toast.module.css';

const Toast = ({ message, type = 'error', onClose, duration = 5000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`${Style.toast} ${Style[type]}`} onClick={onClose}>
            <div className={Style.toast_content}>
                <div className={Style.toast_icon}>
                    {type === 'error' && '⚠️'}
                    {type === 'warning' && '⚡'}
                    {type === 'info' && 'ℹ️'}
                    {type === 'success' && '✓'}
                </div>
                <p className={Style.toast_message}>{message}</p>
                <button className={Style.toast_close} onClick={onClose} aria-label="Close">
                    ✕
                </button>
            </div>
            <div className={Style.toast_progress} style={{ animationDuration: `${duration}ms` }} />
        </div>
    );
};

export default Toast;
