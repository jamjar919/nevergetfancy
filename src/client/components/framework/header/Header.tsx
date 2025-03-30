import React from 'react';

import styles from './Header.module.scss';

type HeaderProps = {
    title: string;
    subtitle?: string;
};

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return (
        <div className={styles.header}>
            <h1>
                <a className={styles.titleLink} href={'/'}>
                    {title}
                </a>
            </h1>
            {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
        </div>
    );
};

export { Header };
