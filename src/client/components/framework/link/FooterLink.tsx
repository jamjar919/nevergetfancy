'use client';

import classNames from 'classnames';

import React from 'react';

import styles from './FooterLink.module.scss';

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {};

const FooterLink: React.FC<LinkProps> = (props) => {
    const { children, className, ...linkProps } = props;

    const classname = classNames(styles.link, className);

    return (
        <a className={classname} {...linkProps}>
            {children}
        </a>
    );
};

export { FooterLink };
