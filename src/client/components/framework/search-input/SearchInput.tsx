import React from "react";

import styles from "./SearchInput.module.scss";
import {SearchIcon} from "../icon/SearchIcon";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>

const SearchInput: React.FC<SearchInputProps> = (props) => {

    return (
        <div className={styles.searchContainer}>
            <div className={styles.iconContainer}>
                <SearchIcon className={styles.icon} />
            </div>
            <div className={styles.inputContainer}>
                <input
                    {...props}
                    className={styles.input}
                />
            </div>
        </div>
    )
}

export { SearchInput }