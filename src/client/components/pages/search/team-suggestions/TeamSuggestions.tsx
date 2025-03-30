"use client";

import React, {useMemo} from "react";
import {TeamCard} from "../team-card/TeamCard";

import styles from "./TeamSuggestions.module.scss";

// according to https://fpl.page/realplayers
const REAL_PLAYER_TEAMS: Array<{
    teamId: string;
    teamName: string;
    managerName: string;
}> = [
    {
        teamId: "2458154",
        teamName: "Substitute Implosion",
        managerName: "James Paterson"
    },
    {
        teamId: "5474509",
        teamName: "The Ruby Reds",
        managerName: "Susan Clarke"
    },
    {
        teamId: "8206546",
        teamName: "Mo",
        managerName: "Mo Salah"
    },
    {
        teamId: "8204280",
        teamName: "Change Name",
        managerName: "Andy Robertson"
    },
    {
        teamId: "7423041",
        teamName: "Baines on toast",
        managerName: "Not The Real Kalvin Phillips"
    },
    {
        teamId: "1480147",
        teamName: "Off the rack",
        managerName: "Anthony Gordon"
    },
    {
        teamId: "8355739",
        teamName: "lallana del rey",
        managerName: "trent arnold"
    },
    {
        teamId: "8199263",
        teamName: "Meatballers",
        managerName: "John McGinn"
    },
    {
        teamId: "4716449",
        teamName: "Always",
        managerName: "James Maddison"
    },
    {
        teamId: "7908566",
        teamName: "Luna eSports",
        managerName: "Diogo Jota"
    },
    {
        teamId: "3886581",
        teamName: "TeamTav",
        managerName: "Marcus Tavernier"
    },
    {
        teamId: "2561783",
        teamName: "Pat fc",
        managerName: "patrick Dorgu"
    },
    {
        teamId: "6622238",
        teamName: "Death, Taxes and …..",
        managerName: "Antoine Semenyo"
    },
];

const getTeamsWithNoDuplicates = (num: number) => {
    const randomTeams = [];
    while (randomTeams.length < num) {
        const randomIndex = Math.floor(Math.random() * REAL_PLAYER_TEAMS.length);
        const randomTeam = REAL_PLAYER_TEAMS[randomIndex];
        if (!randomTeams.includes(randomTeam)) {
            randomTeams.push(randomTeam);
        }
    }
    return randomTeams.map(({ teamId, teamName, managerName }) => (
        <div className={styles.suggestion} key={teamId}>
            <TeamCard teamId={teamId} teamName={teamName} managerName={managerName} />
        </div>
    ));
}

const TeamSuggestions: React.FC = () => {
    const randomTeams = useMemo(() => getTeamsWithNoDuplicates(4), []);

    return (
        <div className={styles.suggestions}>
            {randomTeams}
        </div>
    )
}

export { TeamSuggestions }