"use client";

import React, {useEffect, useMemo, useState} from "react";
import {TextInput} from "../../../framework/text-input/TextInput";

import styles from "./EnterTeamName.module.scss";
import {EnterTeamNameSearchResult} from "./search-result/EnterTeamNameSearchResult";

const MOST_COMMON_NAME = [
    "Hakuna Mateta",
    "Palmer Violets",
    "Alisson Wonderland",
    "Saka Potatoes",
    "Livin’ Saliba Loca",
    "Haven’t Jota Clue",
    "Slot Machine",
    "Ctrl Alt De Ligt",
    "ChickenTikkaMoSalah",
    "Kinder Mbeumo",
    "Corn on the Kobbie",
    "Old Havertz Kai Hard",
    "Bowen 747",
    "Turkish De Ligt",
    "Back of the Neto",
    "Snoop Udogie Dogg",
    "Pique Blinders",
    "Rice Rice Baby",
    "Major League Saka",
    "Expected Toulouse"
]

const EnterTeamName: React.FC = () => {
    const [query, setQuery] = React.useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query= e.target.value;
        setQuery(query);
    }

    // Avoid SSR errors
    const [placeholder, setPlaceholder] = useState<string>("");
    useEffect(() => {
        setPlaceholder(MOST_COMMON_NAME[Math.floor(Math.random() * MOST_COMMON_NAME.length)]);
    }, []);

    return (
        <div className={styles.enterTeamName}>
            <div>
                <label className={styles.label}>
                    Enter your Team Name:
                </label>
                <TextInput
                    type="Team or manager name"
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={query}
                />
            </div>
            <div className={styles.result}>
                <EnterTeamNameSearchResult query={query.trim()} />
            </div>
        </div>
    )
}

export { EnterTeamName }