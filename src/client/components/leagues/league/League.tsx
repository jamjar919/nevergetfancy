import React from "react";
import {LeagueAttributesFragment} from "../../../../graphql/generated/Client";
import {LeagueParticipant} from "../participant/LeagueParticipant";

import styles from "./League.module.scss"

type LeagueProps = {
    league: LeagueAttributesFragment
}

const League: React.FC<LeagueProps> = (props) => {
    const {
        league: {
            name,
            standings
        }
    } = props;

    return (
        <div>
            <h1>{name}</h1>
            <ul className={styles.standings}>
                {standings.map((standing) => (<LeagueParticipant key={standing.team.id} standing={standing} />))}
            </ul>
        </div>
    )
}

export { League }