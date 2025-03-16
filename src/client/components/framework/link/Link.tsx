"use client";

import React, {useRef} from "react";

import styles from "./Link.module.scss";
import classNames from "classnames";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {}

const Link: React.FC<LinkProps> = (props) => {
    const { children, className, ...linkProps } = props;

    const classname = classNames(styles.link, className);

    const ref = useRef<HTMLAnchorElement>(null);

    const size = ref.current?.getBoundingClientRect().width;

    const style = {
        boxShadow: `inset ${size} 0 0 0 var(--light-text);`
    }

    return (
        <a className={classname} ref={ref} style={style} {...linkProps} >
            {children}
        </a>
    );
}

export { Link }