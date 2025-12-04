import React from 'react';
import styles from './FormInput.module.css';

export const FormInput = ({ label, error, className, ...props }) => {
    return (
        <div className={`${styles.formInput} ${className || ''}`}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                className={`${styles.input} ${error ? styles.error : ''}`}
                {...props}
            />
            {error && <p className={styles.errorText}>{error}</p>}
        </div>
    );
};

export const FormInputWithIcon = ({ label, icon: Icon, error, helperText, className, ...props }) => {
    return (
        <div className={`${styles.formInput} ${className || ''}`}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={`${styles.inputWrapper} ${error ? styles.error : ''}`}>
                {Icon && (
                    <div className={styles.iconBox}>
                        <Icon />
                    </div>
                )}
                <input className={styles.inputWithIcon} {...props} />
            </div>
            {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
            {error && <p className={styles.errorText}>{error}</p>}
        </div>
    );
};

export const FormTextarea = ({ label, error, helperText, className, ...props }) => {
    return (
        <div className={`${styles.formInput} ${className || ''}`}>
            {label && <label className={styles.label}>{label}</label>}
            <textarea
                className={`${styles.textarea} ${error ? styles.error : ''}`}
                {...props}
            />
            {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
            {error && <p className={styles.errorText}>{error}</p>}
        </div>
    );
};
