import React from "react";

import styles from "./Badge.module.scss";

type BadgeWithOnClickProps = {
    onClick: () => void;
    href?: never;
}

type BadgeWithHrefProps = {
    href: string;
    target?: string;
    onClick?: never;
}

type BadgeProps = (BadgeWithHrefProps | BadgeWithOnClickProps) & {
    Icon?: React.FC<React.SVGProps<SVGElement>>;
};

const Badge: React.FC<BadgeProps> = (props) => {
    const { children, Icon, href, onClick, target } = props;

    let badgeContent = children;
    if (Icon) {
        badgeContent = (
            <>
                {children}
                <Icon className={styles.icon} />
            </>
        );
    }

    if (href) {
        return (
            <a href={href} target={target} className={styles.badge}>{badgeContent}</a>
        )
    }

    return (
        <button className={styles.badge} onClick={onClick}>{badgeContent}</button>
    )
}

export { Badge }