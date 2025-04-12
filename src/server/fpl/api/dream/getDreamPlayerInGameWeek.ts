import { EventId, PremierLeaguePlayerId } from '../../../../graphql/Reference';
import { fetchFromApi } from '../../../util/fetchFromApi';
import { FantasyPremierLeagueApi } from '../apiConfig';
import { DreamTeamApiResponse } from './DreamTeamApiResponse';

const getDreamPlayerInGameWeek = async (gameweek: EventId): Promise<PremierLeaguePlayerId> => {
    const response = await fetchFromApi(FantasyPremierLeagueApi.DreamTeam(gameweek)).then(
        (res) => res.json() as Promise<DreamTeamApiResponse>
    );

    return String(response.top_player.id) as PremierLeaguePlayerId;
};

export { getDreamPlayerInGameWeek };
