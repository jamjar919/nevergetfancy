import classNames from 'classnames';

import React, { useEffect, useRef } from 'react';

import styles from './InlineSelectInput.module.scss';

type SelectOption = {
    value: string;
    label: string;
};

type SelectInputProps = {
    options: SelectOption[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const InlineSelectInput: React.FC<SelectInputProps> = (props) => {
    const { options, className, ...passThroughProps } = props;

    const ref = useRef<HTMLSelectElement>(null);

    if (!options || options.length === 0) {
        return null;
    }

    // Set width of select to the width of the rendered option to avoid the select being too wide
    const selectedOption = options.find((option) => option.value === props.value);
    useEffect(() => {
        if (ref.current && selectedOption) {
            ref.current.style.maxWidth = `${selectedOption.label.length + 2.5}ch`;
        }
    }, [selectedOption, ref.current]);

    const optionElements = options.map((option) => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    ));

    return (
        <select
            ref={ref}
            className={classNames(className, styles.selectInput)}
            {...passThroughProps}
        >
            {optionElements}
        </select>
    );
};

export { InlineSelectInput };
