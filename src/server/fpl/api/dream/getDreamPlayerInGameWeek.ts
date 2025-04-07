import { EventId, PremierLeaguePlayerId } from '../../../../graphql/Reference';
import { fetchFromApi } from '../../../util/fetchFromApi';
import { FantasyPremierLeagueApi } from '../apiConfig';

const getDreamPlayerInGameWeek = async (gameweek: EventId): Promise<PremierLeaguePlayerId> => {
    const response = await fetchFromApi(FantasyPremierLeagueApi.DreamTeam(gameweek)).then(
        (res) => res.json() as any
    );

    return response.top_player.id as PremierLeaguePlayerId;
};

export { getDreamPlayerInGameWeek };
