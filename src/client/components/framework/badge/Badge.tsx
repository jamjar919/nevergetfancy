import React from "react";

import styles from "./Badge.module.scss";

type BadgeProps = {
    onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = (props) => {
    const { children, onClick } = props;

    return (
        <button className={styles.badge} onClick={onClick}>{children}</button>
    )
}

export { Badge }