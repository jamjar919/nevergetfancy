"use client";

import React, {useEffect, useState} from "react";

import styles from "./EnterTeamId.module.scss";
import {TextInput} from "../../../framework/text-input/TextInput";
import {EnterTeamIdSearchResult} from "./search-result/EnterTeamIdSearchResult";
import {LocalStorageKey} from "../../../../util/LocalStorage";
import {ExplainTeamIdModal} from "./explanation-modal/ExplainTeamIdModal";
import {SearchInput} from "../../../framework/search-input/SearchInput";

const EnterTeamId: React.FC = () => {
    const [teamId, setTeamId] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const teamId= e.target.value;
        setTeamId(teamId);
        window.localStorage.setItem(LocalStorageKey.lastEnteredTeamId, teamId);
    }

    // Load the last team ID from local storage
    useEffect(() => {
        const lastTeamId = window.localStorage.getItem(LocalStorageKey.lastEnteredTeamId) || "";
        setTeamId(lastTeamId);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.enterTeamId}>
            <div>
                <label className={styles.label}>
                    Enter your Team ID: <button className={styles.whatsThat} onClick={() => setIsModalOpen(true)}>(what's that?)</button>
                </label>
                <SearchInput
                    placeholder="123456"
                    onChange={handleChange}
                    value={teamId}
                />
            </div>
            <div className={styles.result}>
                <EnterTeamIdSearchResult teamId={teamId.trim()} />
            </div>
            <ExplainTeamIdModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}/>
        </div>
    )
}

export { EnterTeamId }