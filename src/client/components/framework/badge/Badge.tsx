import React, { PropsWithChildren } from 'react';

import styles from './Badge.module.scss';

type BadgeWithOnClickProps = {
    onClick: () => void;
    href?: never;
    target?: never;
};

type BadgeWithHrefProps = {
    href: string;
    target?: string;
    onClick?: never;
};

type BadgeProps = (BadgeWithHrefProps | BadgeWithOnClickProps) &
    PropsWithChildren<{
        Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    }>;

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
            <a href={href} target={target} className={styles.badge}>
                {badgeContent}
            </a>
        );
    }

    return (
        <button className={styles.badge} onClick={onClick}>
            {badgeContent}
        </button>
    );
};

export { Badge };
