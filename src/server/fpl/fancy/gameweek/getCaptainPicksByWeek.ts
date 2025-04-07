import { EventId } from '../../../../graphql/Reference';
import { FancyPickLine } from '../../../../graphql/generated/Resolver';
import { convertGameSummary } from '../../../resolver/converter/convertGameSummary';
import { getPlayerPreviousGame } from '../../api/player/getPlayerPreviousGame';
import { GameweekHistoryDto } from '../../api/type/GameweekHistoryDto';
import { getCaptainForGameweek } from './getCaptainForGameweek';

/**
 * Get the results by gameweek for a team
 */
const getCaptainScoresByWeek = async (weeks: GameweekHistoryDto[]): Promise<FancyPickLine[]> => {
    return await Promise.all(
        weeks.map(async (week) => {
            const eventId: EventId = week.gameweek;
            const captain = getCaptainForGameweek(week);
            const gameSummary = await getPlayerPreviousGame(captain.captainId, eventId);

            return {
                gameweek: eventId,
                captainId: captain.captainId,
                wasOriginallyViceCaptain: captain.wasOriginallyViceCaptain,
                captainGameSummary: gameSummary ? convertGameSummary(gameSummary) : undefined,
            };
        })
    );
};

export { getCaptainScoresByWeek };
