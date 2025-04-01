import { EventId } from '../../../../graphql/Reference';
import { getPlayerPreviousGame } from '../../api/player/getPlayerPreviousGame';
import { GameweekHistoryDto } from '../../api/type/GameweekHistoryDto';
import { PlayerPreviousGameDto } from '../../api/type/PlayerPreviousGameDto';
import { getCaptainForGameweek } from './getCaptainForGameweek';
import { CaptainDto } from './type/CaptainDto';

type CaptainSummaryForGameWeek = {
    captain: CaptainDto;
    gameSummary?: PlayerPreviousGameDto;
};

type CaptainSummaryPerWeek = { [key: EventId]: CaptainSummaryForGameWeek };

/**
 * Get the results by gameweek for a team
 */
const getCaptainScoresByWeek = async (
    weeks: GameweekHistoryDto[]
): Promise<CaptainSummaryPerWeek> => {
    const captainScoresByWeek: CaptainSummaryPerWeek = {};

    // Get the performance of the player's selected captain for each week
    const performances = await Promise.all(
        weeks.map(async (week) => {
            const eventId: EventId = week.gameweek;
            const captain = getCaptainForGameweek(week);
            const gameSummary = await getPlayerPreviousGame(captain.captainId, eventId);

            return {
                gameweek: eventId,
                captain,
                gameSummary,
            };
        })
    );

    // Convert to map
    performances.forEach((week) => {
        captainScoresByWeek[week.gameweek] = {
            captain: week.captain,
            gameSummary: week.gameSummary,
        };
    });

    return captainScoresByWeek;
};

export { getCaptainScoresByWeek };
