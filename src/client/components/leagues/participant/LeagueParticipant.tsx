import React from "react";
import {LeagueStandingAttributesFragment} from "../../../../graphql/generated/Client";

import styles from "./LeagueParticipant.module.scss"

type LeagueParticipantProps = {
    standing: LeagueStandingAttributesFragment
}

const LeagueParticipant: React.FC<LeagueParticipantProps> = (props) => {
    const {
        standing: {
            rank,
            team: {
                id,
                name,
                manager: {
                    name: managerName
                }
            }
        }
    } = props;

    return (
        <a href={`/team/${id}`} className={styles.link}>
            <div className={styles.participant}>
                <div className={styles.rank}>#{rank}</div>
                <div className={styles.nameContainer}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.managerName}>{managerName}</div>
                </div>
            </div>
        </a>
    )
}

export { LeagueParticipant }