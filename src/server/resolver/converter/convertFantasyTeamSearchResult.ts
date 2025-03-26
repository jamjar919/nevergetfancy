import {FantasyTeamSearchResult} from "../../../graphql/generated/Resolver";
import {TeamSearchResultDto} from "../../db/type/TeamSearchResultDto";

const convertFantasyTeamSearchResult = (team: TeamSearchResultDto): FantasyTeamSearchResult => {
    return {
        id: team.id,
        teamName: team.teamName,
        managerName: team.managerName
    }
}

export { convertFantasyTeamSearchResult }