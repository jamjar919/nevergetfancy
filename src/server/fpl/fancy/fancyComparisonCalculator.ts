import { EventId, FantasyManagerId, PremierLeaguePlayerId } from '../../../graphql/Reference';
import {
    FancyComparison,
    FancyPickLine,
    FancyResultLine,
} from '../../../graphql/generated/Resolver';
import { convertGameSummary } from '../../resolver/converter/convertGameSummary';
import { getDreamPlayerInGameWeek } from '../api/dream/getDreamPlayerInGameWeek';
import { getBestCaptainPickInTeamForGameWeek } from '../api/picks/getBestCaptainPickInTeamForGameWeek';
import { getPlayerPreviousGame } from '../api/player/getPlayerPreviousGame';
import { PlayerGamePerformanceDto } from '../api/type/PlayerGamePerformanceDto';
import { HAALAND_PLAYER_ID, SALAH_PLAYER_ID } from './fancyMan';

enum FancyComparisonTypeEnum {
    BestPlayerInTeam = 'BEST_PLAYER_IN_TEAM',
    BestPlayerOverall = 'BEST_PLAYER_OVERALL',
    Haaland = 'HAALAND',
    Salah = 'SALAH',
}

// return a fn that returns the player id we should compare to for a given gameweek
const fancyGetPlayerComparisonFactory = (
    type: FancyComparisonTypeEnum
): ((gameweek: EventId, managerId: FantasyManagerId) => Promise<PremierLeaguePlayerId>) => {
    switch (type) {
        case FancyComparisonTypeEnum.Salah:
            return () => Promise.resolve(SALAH_PLAYER_ID);
        case FancyComparisonTypeEnum.Haaland:
            return () => Promise.resolve(HAALAND_PLAYER_ID);
        case FancyComparisonTypeEnum.BestPlayerOverall:
            return (gameweek: EventId) => getDreamPlayerInGameWeek(gameweek);
        case FancyComparisonTypeEnum.BestPlayerInTeam:
            return (
                gameweek: EventId,
                managerId: FantasyManagerId
            ): Promise<PremierLeaguePlayerId> =>
                getBestCaptainPickInTeamForGameWeek(managerId, gameweek);
        default:
            throw new Error('Not implemented');
    }
};

const fancyComparisonCalculator = async (
    managerId: FantasyManagerId,
    playerPicks: FancyPickLine[],
    type: FancyComparisonTypeEnum
): Promise<FancyComparison> => {
    const getPlayerToCompareTo = fancyGetPlayerComparisonFactory(type);

    // Get the list of comparison scores for each gameweek
    const comparisonScores = await Promise.all(
        playerPicks.map(async (line: FancyPickLine): Promise<FancyResultLine> => {
            const comparisonPlayerId = await getPlayerToCompareTo(
                line.gameweek as EventId,
                managerId
            );

            const comparisonGameSummary: PlayerGamePerformanceDto | undefined =
                await getPlayerPreviousGame(comparisonPlayerId, line.gameweek as EventId);

            const points = comparisonGameSummary?.points || 0;
            const playerScore = line.captainGameSummary?.points || 0;

            const pointDifference = playerScore - points;

            const gotFancy = String(line.captainId) !== String(comparisonPlayerId);
            
            return {
                gameweek: line.gameweek,
                playerId: comparisonPlayerId,
                gotFancy,
                pointDifference,
                comparisonGameSummary: comparisonGameSummary
                    ? convertGameSummary(comparisonGameSummary)
                    : undefined,
            };
        })
    );

    // Sort by descending gameweek
    comparisonScores.sort((a: FancyResultLine, b: FancyResultLine) => b.gameweek - a.gameweek);

    const timesGotFancy = comparisonScores.filter((line: FancyResultLine) => line.gotFancy).length;
    const totalPointDifference = comparisonScores.reduce(
        (acc: number, line: FancyResultLine) => acc + line.pointDifference,
        0
    );
    const worstGameweek = comparisonScores.reduce((acc: FancyResultLine, line: FancyResultLine) => {
        if (line.pointDifference < acc.pointDifference) {
            return line;
        }
        return acc;
    }, comparisonScores[0]);

    return {
        comparisonScores,
        timesGotFancy,
        totalPointDifference,
        worstGameweek,
    };
};

export { fancyComparisonCalculator, FancyComparisonTypeEnum };
