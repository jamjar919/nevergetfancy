"use client";

import React from "react";
import {Header} from "../../framework/header/Header";
import {useLeaguesForTeamQuery} from "../../../../graphql/generated/Client";
import {FantasyManagerId} from "../../../../graphql/Reference";
import {League} from "./league/League";
import {LeagueSearch} from "./search/LeagueSearch";
import {LeagueLinks} from "./links/LeagueLinks";

import styles from "./Leagues.module.scss";

type LeaguesProps = {
    teamId: FantasyManagerId
}

const Leagues: React.FC<LeaguesProps> = ({
    teamId
}) => {
    const {
        data
    } = useLeaguesForTeamQuery({
        variables: {
            fantasyTeamId: teamId
        }
    })

    if (!data) {
        return <div>Loading...</div>
    }

    const {
        fantasyTeam: {
            leagues,
            manager: {
                name
            }
        },
    } = data;

    return (
        <div>
            <header>
                <Header title={"Leagues"} subtitle={`For ${name}`} />
            </header>
            <div className={styles.links}>
                <LeagueLinks teamId={teamId} />
            </div>
            <LeagueSearch leagues={leagues} />
            {leagues.map((league) => (<League key={league.id} league={league} />))}
        </div>
    )
}

export { Leagues }