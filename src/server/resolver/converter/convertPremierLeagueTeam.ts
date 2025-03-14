import {PremierLeagueTeamDto} from "../../fpl/api/type/PremierLeagueTeamDto";
import {PremierLeagueTeam} from "../../../graphql/generated/Resolver";

const convertPremierLeagueTeam = (dto: PremierLeagueTeamDto): PremierLeagueTeam => {
    return {
        id: dto.id,
        name: dto.name,
        shortName: dto.shortName,
        position: dto.position
    };
}

export { convertPremierLeagueTeam }