import {TeamCard} from "../../team-card/TeamCard";
import React from "react";
import {useDoesTeamExist} from "./UseDoesTeamExist";
import {FootballSpinnerLoader} from "../../../../framework/loader/football-spinner/FootballSpinnerLoader";

type EnterTeamIdSearchResultProps = {
    teamId: string;
}

const EnterTeamIdSearchResult: React.FC<EnterTeamIdSearchResultProps> = (props) => {
    const {
        teamId
    } = props;

    const {data, loading, error } = useDoesTeamExist(teamId);

    if (teamId === "") {
        return;
    }

    if (loading) {
        return <FootballSpinnerLoader />;
    }

    if (error) {
        return "🚫 Not found";
    }

    if (data) {
        const {
            fantasyTeam: {
                id,
                name,
                manager: {
                    name: managerName
                }
            }
        } = data;

        return (
            <TeamCard
                teamId={id}
                teamName={name}
                managerName={managerName}
            />
        );
    }

    return "Team not found";
}

export { EnterTeamIdSearchResult }