import { PremierLeaguePlayerPosition } from '../../../graphql/generated/Resolver';
import { PremierLeaguePlayerTypeDto } from '../../fpl/api/type/PremierLeaguePlayerTypeDto';

const convertPremierLeaguePlayerPosition = (
    position: PremierLeaguePlayerTypeDto
): PremierLeaguePlayerPosition => {
    return position as unknown as PremierLeaguePlayerPosition;
};

export { convertPremierLeaguePlayerPosition };
