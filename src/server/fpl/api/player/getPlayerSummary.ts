import { PremierLeaguePlayerId } from '../../../../graphql/Reference';
import { fetchFromApi } from '../../../util/fetchFromApi';
import { FantasyPremierLeagueApi } from '../apiConfig';
import {
    PlayerGamePerformanceDto,
    playerPerformanceDtoFromApi,
} from '../type/PlayerGamePerformanceDto';
import { PlayerSummaryApiResponse } from './PlayerSummaryApiResponse';

const getPlayerPreviousGames = async (
    playerId: PremierLeaguePlayerId
): Promise<PlayerGamePerformanceDto[]> => {
    const response = await fetchFromApi(FantasyPremierLeagueApi.PlayerSummary(playerId));

    if (!response.ok) {
        throw new Error(
            `Error fetching player summary for player ${playerId}: ${response.statusText}`
        );
    }

    const data: PlayerSummaryApiResponse = await response.json();

    return data.history.map((game) =>
        playerPerformanceDtoFromApi(game, playerId)
    );
};

export { getPlayerPreviousGames };
