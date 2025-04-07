import { EventId, PremierLeaguePlayerId } from '../../../../graphql/Reference';
import { PlayerGamePerformanceDto } from '../type/PlayerGamePerformanceDto';
import { getPlayerPreviousGames } from './getPlayerSummary';

const getPlayerPreviousGame = async (
    playerId: PremierLeaguePlayerId,
    gameweek: EventId
): Promise<PlayerGamePerformanceDto | undefined> => {
    const previousGames = await getPlayerPreviousGames(playerId);

    return previousGames.find((game) => game.gameweek === gameweek);
};

export { getPlayerPreviousGame };
