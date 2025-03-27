"use client";

import React from "react";
import {useSearchForTeam} from "./UseSearchForTeam";
import {TeamCard} from "../../team-card/TeamCard";
import {FootballSpinnerLoader} from "../../../../framework/loader/football-spinner/FootballSpinnerLoader";

type EnterTeamNameSearchResultProps = {
    query: string;
}

const EnterTeamNameSearchResult: React.FC<EnterTeamNameSearchResultProps> = (props) => {
    const {
        query
    } = props;

    const {data, loading, error } = useSearchForTeam(query);

    if (query === "") {
        return;
    }

    if (loading) {
        return <FootballSpinnerLoader />;
    }

    if (error) {
        return "🚫 No results";
    }

    const {
        searchFantasyTeam
    } = data;

    if (searchFantasyTeam.length === 0) {
        return "Sorry, no results.";
    }

    return searchFantasyTeam.map((team) => {
        const {
            id,
            teamName,
            managerName
        } = team;

        return (
            <TeamCard
                teamId={id}
                teamName={teamName}
                managerName={managerName}
            />
        )
    })
}

export { EnterTeamNameSearchResult }