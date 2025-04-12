import { EventId, PremierLeaguePlayerId } from '../../../../graphql/Reference';
import { getPlayerPerformanceById } from '../bootstrap/bootstrap';
import { PlayerGamePerformanceDto } from '../type/PlayerGamePerformanceDto';
import { getPlayerPreviousGames } from './getPlayerSummary';

const getPlayerPreviousGame = async (
    playerId: PremierLeaguePlayerId,
    gameweek: EventId
): Promise<PlayerGamePerformanceDto | undefined> => {
    // Attempt to get cached performance data
    const cachedGame = getPlayerPerformanceById(playerId, gameweek);
    if (cachedGame) {
        return cachedGame;
    }

    // If not available in cache, fetch the previous games
    const previousGames = await getPlayerPreviousGames(playerId);
    return previousGames.find((game) => game.gameweek === gameweek);
};

export { getPlayerPreviousGame };
