import { PremierLeaguePlayer } from '../../../graphql/generated/Resolver';
import { PremierLeaguePlayerDto } from '../../fpl/api/type/PremierLeaguePlayerDto';
import { convertPremierLeaguePlayerPosition } from './convertPremierLeaguePlayerPosition';

const convertPremierLeaguePlayer = (dto: PremierLeaguePlayerDto): PremierLeaguePlayer => {
    return {
        id: String(dto.id),
        firstName: dto.firstName,
        lastName: dto.secondName,
        displayName: dto.webName,
        totalPoints: dto.totalPoints,
        goals: dto.goalsScored,
        assists: dto.assists,
        cleanSheets: dto.cleanSheets,
        bonus: dto.bonus,
        teamId: dto.team,
        position: convertPremierLeaguePlayerPosition(dto.type),
    };
};

export { convertPremierLeaguePlayer };
