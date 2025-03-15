import {PremierLeaguePlayerDto} from "../../fpl/api/type/PremierLeaguePlayerDto";
import {PremierLeaguePlayer} from "../../../graphql/generated/Resolver";
import {convertPremierLeaguePlayerPosition} from "./convertPremierLeaguePlayerPosition";

const convertPremierLeaguePlayer = (dto: PremierLeaguePlayerDto): PremierLeaguePlayer => {
    return {
        id: String(dto.id),
        firstName: dto.firstName,
        lastName: dto.secondName,
        displayName: dto.webName,
        totalPoints: dto.totalPoints,
        goals: dto.goalsScored,
        teamId: dto.team,
        position: convertPremierLeaguePlayerPosition(dto.type),
    };
}

export { convertPremierLeaguePlayer }