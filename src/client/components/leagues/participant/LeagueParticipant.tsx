import React from "react";
import {LeagueStandingAttributesFragment} from "../../../../graphql/generated/Client";

import styles from "./LeagueParticipant.module.scss"

type LeagueParticipantProps = {
    standing: LeagueStandingAttributesFragment
}

const LeagueParticipant: React.FC<LeagueParticipantProps> = (props) => {
    const {
        standing: {
            teamId,
            rank,
            playerName,
            teamName
        }
    } = props;

    return (
        <a href={`/team/${teamId}`} className={styles.link}>
            <div className={styles.participant}>
                <div className={styles.rank}>#{rank}</div>
                <div className={styles.nameContainer}>
                    <div className={styles.name}>{playerName}</div>
                    <div className={styles.managerName}>{teamName}</div>
                </div>
            </div>
        </a>
    )
}

export { LeagueParticipant }