import React from 'react';

import { SearchIcon } from '../icon/SearchIcon';

import styles from './SearchInput.module.scss';

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput: React.FC<SearchInputProps> = (props) => {
    return (
        <div className={styles.searchContainer}>
            <div className={styles.iconContainer}>
                <SearchIcon className={styles.icon} />
            </div>
            <div className={styles.inputContainer}>
                <input {...props} className={styles.input} />
            </div>
        </div>
    );
};

export { SearchInput };
