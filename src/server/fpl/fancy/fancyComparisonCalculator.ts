import { EventId, PremierLeaguePlayerId } from '../../../graphql/Reference';
import {
    FancyComparison,
    FancyPickLine,
    FancyResultLine,
} from '../../../graphql/generated/Resolver';
import { convertGameSummary } from '../../resolver/converter/convertGameSummary';
import { getPlayerPreviousGame } from '../api/player/getPlayerPreviousGame';
import { PlayerPreviousGameDto } from '../api/type/PlayerPreviousGameDto';
import { SALAH_PLAYER_ID } from './fancyMan';

enum FancyComparisonTypeEnum {
    BestPlayerInTeam = 'BEST_PLAYER_IN_TEAM',
    BestPlayerOverall = 'BEST_PLAYER_OVERALL',
    Haaland = 'HAALAND',
    Salah = 'SALAH',
}

const fancyGetPlayerComparisonFactory = (
    type: FancyComparisonTypeEnum
): (() => Promise<PremierLeaguePlayerId>) => {
    switch (type) {
        case FancyComparisonTypeEnum.Salah:
            return () => Promise.resolve(SALAH_PLAYER_ID);
        default:
            throw new Error('Not implemented');
    }
};

const fancyComparisonCalculator = async (
    playerPicks: FancyPickLine[],
    type: FancyComparisonTypeEnum
): Promise<FancyComparison> => {
    const getPlayerToCompareTo = fancyGetPlayerComparisonFactory(type);

    // Get the list of comparison scores for each gameweek
    const comparisonScores = await Promise.all(
        playerPicks.map(async (line: FancyPickLine): Promise<FancyResultLine> => {
            const comparisonPlayerId = await getPlayerToCompareTo();
            const comparisonGameSummary: PlayerPreviousGameDto | undefined =
                await getPlayerPreviousGame(comparisonPlayerId, line.gameweek as EventId);

            const points = comparisonGameSummary?.points || 0;
            const playerScore = line.captainGameSummary?.points || 0;

            const pointDifference = playerScore - points;

            const gotFancy = line.captainId !== comparisonPlayerId;

            return {
                gameweek: line.gameweek,
                playerId: line.captainId,
                gotFancy,
                points,
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
