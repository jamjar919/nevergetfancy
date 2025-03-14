'use client';

import React from "react";

import {useFantasyTeamQueryQuery} from "../../../graphql/generated/Client";
import {FantasyManagerId} from "../../../graphql/Reference";

type FantasyTeamProps = {
    teamId: FantasyManagerId
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