import {FantasyTeamLeagueStandingDto} from "../../fpl/api/type/FantasyTeamLeagueStandingDto";
import {FantasyLeagueStanding} from "../../../graphql/generated/Resolver";

const convertFantasyLeagueStanding = (dto: FantasyTeamLeagueStandingDto): FantasyLeagueStanding => {
    return {
        teamId: dto.teamId,
        rank: dto.rank,
        teamName: dto.teamName,
        playerName: dto.playerName,
    }
}

export { convertFantasyLeagueStanding }