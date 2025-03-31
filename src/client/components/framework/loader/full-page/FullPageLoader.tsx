import React from 'react';

import styles from "./FullPageLoader.module.scss";

const FullPageLoader: React.FC = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
        </div>
    )
}

export { FullPageLoader }