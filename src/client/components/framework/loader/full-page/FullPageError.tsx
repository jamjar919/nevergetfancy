import React from 'react';

import styles from './FullPageError.module.scss';

interface FullPageErrorProps {
    message?: string;
}

const FullPageError: React.FC<FullPageErrorProps> = ({
    message = 'Oops! Something went wrong',
}) => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.error}>
                <img
                    src={'/images/salah-head.png'}
                    alt={'Mo Salah with a crown on his head'}
                    className={styles.image}
                />
            </div>
            <div className={styles.messageContainer}>
                <h2 className={styles.errorTitle}>Error!</h2>
                <p className={styles.errorMessage}>{message}</p>
            </div>
        </div>
    );
};

export { FullPageError };
