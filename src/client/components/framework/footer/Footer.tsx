import React from "react";
import {Link} from "../link/Link";

import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            Made with ❤️ by <Link href="https://thejamespaterson.com">James Paterson</Link>
        </div>
    )
}

export { Footer }