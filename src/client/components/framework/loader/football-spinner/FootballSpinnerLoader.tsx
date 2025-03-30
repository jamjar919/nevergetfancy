import React from 'react';

import styles from './FootballSpinnerLoader.module.scss';

const FootballSpinnerLoader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}>⚽</div>
        </div>
    );
};

export { FootballSpinnerLoader };
