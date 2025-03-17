import React from "react";

import styles from "./HeaderFooterLayout.module.scss";
import {Footer} from "./footer/Footer";

const HeaderFooterLayout: React.FC<{}> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.content}>{children}</div>
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    )
};

export { HeaderFooterLayout }