import React from "react";
import styles from "./TextInput.module.scss";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, className }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${styles.input} ${className}`}
        />
    );
};

export { TextInput };