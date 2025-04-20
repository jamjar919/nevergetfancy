import { EventId, FantasyManagerId, PremierLeaguePlayerId } from '../../../../graphql/Reference';
import { getPlayerById } from '../bootstrap/bootstrap';
import { getEventPerformance } from '../event/getEventPerformance';
import { PlayerGamePerformanceDto } from '../type/PlayerGamePerformanceDto';
import { PremierLeaguePlayerTypeDto } from '../type/PremierLeaguePlayerTypeDto';
import { getGameweekHistory } from './getGameweekHistory';

const getBestCaptainPickInTeamForGameWeek = async (
    manager: FantasyManagerId,
    gameweek: EventId
): Promise<PremierLeaguePlayerId> => {
    const { picks } = await getGameweekHistory(manager, gameweek);
    const players: Set<PremierLeaguePlayerId> = new Set(picks.map((pick) => pick.playerId));
    const allPlayerPerformances: PlayerGamePerformanceDto[] = await getEventPerformance(gameweek);

    const performances = allPlayerPerformances
        .filter((performance) => players.has(performance.playerId))
        .filter((performance) => {
            const player = getPlayerById(performance.playerId);
            return player.type !== PremierLeaguePlayerTypeDto.Manager;
        });

    const bestPerformance = performances.reduce((best, current) => {
        if (!best || current.points > best.points) {
            return current;
        }
        return best;
    }, performances[0]);

    return bestPerformance.playerId;
};

export { getBestCaptainPickInTeamForGameWeek };
