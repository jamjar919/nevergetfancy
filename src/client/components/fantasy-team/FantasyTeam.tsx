'use client';

import React from "react";

import {useFantasyTeamQueryQuery} from "../../../graphql/generated/Client";
import {FantasyTeamId} from "../../types/Reference";

type FantasyTeamProps = {
    teamId: FantasyTeamId
}

const FantasyTeam: React.FC<FantasyTeamProps> = ({ teamId }) => {
    const {
        data
    } = useFantasyTeamQueryQuery({
        variables: {
            id: teamId
        }
    });

    return (
        <>{JSON.stringify(data)}</>
    )
};

export { FantasyTeam }