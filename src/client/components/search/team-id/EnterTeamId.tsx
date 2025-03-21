"use client";

import React, {useEffect, useState} from "react";

import styles from "./EnterTeamId.module.scss";
import {useDoesTeamExist} from "./UseDoesTeamExist";

const EnterTeamId: React.FC = () => {
    const [teamId, setTeamId] = useState<string>("");
    const teamExists = useDoesTeamExist(teamId);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const teamId= e.target.value;
        setTeamId(teamId);
        window.localStorage.setItem("lastTeamId", teamId);
    }

    // Load the last team ID from local storage
    useEffect(() => {
        const lastTeamId = window.localStorage.getItem("lastTeamId") || "";
        setTeamId(lastTeamId);
    }, []);

    const link = `/team/${teamId}`;

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter your Team ID"
                    className={styles.input}
                    onChange={handleChange}
                    value={teamId}
                />
            </div>
            team exists: {String(teamExists)}
            <a href={link} className={styles.go}>Go!</a>
        </div>
    )
}

export { EnterTeamId }