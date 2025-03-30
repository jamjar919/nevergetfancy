import React, { PropsWithChildren } from 'react';

import { Footer } from './footer/Footer';

import styles from './HeaderFooterLayout.module.scss';

const HeaderFooterLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.content}>{children}</div>
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    );
};

export { HeaderFooterLayout };
