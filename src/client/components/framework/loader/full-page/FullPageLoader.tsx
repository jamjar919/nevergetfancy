import React from 'react';

import styles from "./FullPageLoader.module.scss";

const FullPageLoader: React.FC = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}>
                <img
                    src={'/images/salah-head.png'}
                    alt={'Mo Salah with a crown on his head'}
                    className={styles.image}
                />
            </div>
        </div>
    )
}

export { FullPageLoader }