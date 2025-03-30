import { PremierLeagueTeam } from '../../../graphql/generated/Resolver';
import { PremierLeagueTeamDto } from '../../fpl/api/type/PremierLeagueTeamDto';

const convertPremierLeagueTeam = (dto: PremierLeagueTeamDto): PremierLeagueTeam => {
    return {
        id: dto.id,
        name: dto.name,
        shortName: dto.shortName,
        position: dto.position,
        shirts: {
            homeImageSrc: `/images/shirts/shirt_${dto.shortName}.png`,
        },
    };
};

export { convertPremierLeagueTeam };
