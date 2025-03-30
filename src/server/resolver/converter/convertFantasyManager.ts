import { FantasyTeam } from '../../../graphql/generated/Resolver';
import { FantasyTeamManagerDto } from '../../fpl/api/type/FantasyTeamManagerDto';
import { convertFantasyLeague } from './convertFantasyLeague';

const convertFantasyManager = async (response: FantasyTeamManagerDto): Promise<FantasyTeam> => {
    return {
        id: response.id,
        name: response.teamName,
        manager: {
            name: response.playerFirstName + ' ' + response.playerLastName,
        },
        leagues: response.leagues.map(convertFantasyLeague),
        startedEvent: response.startedEvent,
        currentEvent: response.currentEvent,
    };
};

export { convertFantasyManager };
