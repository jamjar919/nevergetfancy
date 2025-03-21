import React from "react";
import {LeagueStandingAttributesFragment} from "../../../../graphql/generated/Client";
import classNames from "classnames";

import styles from "./LeagueParticipant.module.scss"

type LeagueParticipantProps = {
    standing: LeagueStandingAttributesFragment
}

const getRankClass = (rank: number): string => {
    if (rank === 1) {
        return "🥇";
    }

    if (rank === 2) {
        return "🥈";
    }

    if (rank === 3) {
        return "🥉";
    }

    return `${rank}.`;
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

    const classes = classNames(styles.link, {
        [styles.first]: rank === 1,
        [styles.second]: rank === 2,
        [styles.third]: rank === 3,
    })

    const isClown = teamName === "Change Name"

    return (
        <a href={`/team/${teamId}`} className={classes}>
            <div className={styles.participant}>
                <div className={styles.rank}>{getRankClass(rank)}</div>
                <div className={styles.nameContainer}>
                    <div className={styles.managerName}>{teamName}</div>
                    <div className={styles.name}>
                        {playerName}{' '}
                        <span className={styles.clown}>{isClown ? "🤡" : ""}</span>
                    </div>
                </div>
            </div>
        </a>
    )
}

export { LeagueParticipant }