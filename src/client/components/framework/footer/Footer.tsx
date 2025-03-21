import React from "react";
import {FooterLink} from "../link/FooterLink";

import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <span>Made with ❤️ by <FooterLink href="https://thejamespaterson.com">James Paterson</FooterLink></span>
            <span>•</span>
            <span><FooterLink href="https://github.com/jamjar919/nevergetfancy">Github</FooterLink></span>
        </div>
    )
}

export { Footer }