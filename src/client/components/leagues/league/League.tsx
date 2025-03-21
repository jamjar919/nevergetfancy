import React, {useState} from "react";
import {LeagueAttributesFragment} from "../../../../graphql/generated/Client";
import {LeagueParticipant} from "../participant/LeagueParticipant";

import styles from "./League.module.scss"

type LeagueProps = {
    league: LeagueAttributesFragment
}

const INITIAL_MAX_TO_SHOW = 10;
const EXPAND_TO_SHOW = 20;

const League: React.FC<LeagueProps> = (props) => {
    const {
        league: {
            id,
            name,
            standings
        }
    } = props;

    const [maxToShow, setMaxToShow] = useState(INITIAL_MAX_TO_SHOW);

    const remaining = standings.length - maxToShow;

    const showMore = standings.length > maxToShow ? (
        <button
            className={styles.showMore}
            onClick={() => setMaxToShow(maxToShow + EXPAND_TO_SHOW)}
        >
            Show More ({remaining} remaining)
        </button>
    ) : null;


    return (
        <div>
            <h2 className={styles.leagueTitle}>{name}</h2>
            <div className={styles.standings}>
                {standings
                    .filter((_, idx) => idx < maxToShow)
                    .filter((standing) => !!standing)
                    .map((standing) => (
                        <LeagueParticipant key={standing.teamId + standing.teamName} standing={standing} />
                    ))
                }
                {showMore}
            </div>
        </div>
    )
}

export { League }