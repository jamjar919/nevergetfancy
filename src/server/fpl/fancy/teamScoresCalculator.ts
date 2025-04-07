import { EventId, FantasyManagerId } from '../../../graphql/Reference';
import { FancyResult } from '../../../graphql/generated/Resolver';
import { getArrayWithNumbersInRange } from '../../util/getArrayWithNumbersInRange';
import { getManager } from '../api/manager/getManager';
import { getGameweekHistory } from '../api/picks/getGameweekHistory';
import { getCaptainScoresByWeek } from './gameweek/getCaptainPicksByWeek';

const teamScoresCalculator = async (managerId: FantasyManagerId): Promise<FancyResult> => {
    // Get the manager info + what weeks they've played
    const manager = await getManager(managerId);
    const activeGameweeks = getArrayWithNumbersInRange(manager.startedEvent, manager.currentEvent);

    // Retrieve the history for each active gameweek
    const history = await Promise.all(
        activeGameweeks.map(async (gameweek: number) =>
            getGameweekHistory(managerId, gameweek as EventId)
        )
    );

    // Get the total scores for the captain
    const captainScores = (await getCaptainScoresByWeek(history)).sort(
        (a, b) => b.gameweek - a.gameweek
    );

    // WHERE ARE THE COMPARISONS??
    // (they're handled in the resolver)
    return {
        teamId: managerId,
        captainScores,
    };
};

export { teamScoresCalculator };
