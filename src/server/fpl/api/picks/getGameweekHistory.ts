import { EventId, FantasyManagerId, PremierLeaguePlayerId } from '../../../../graphql/Reference';
import { fetchFromApi } from '../../../util/fetchFromApi';
import { FantasyPremierLeagueApi } from '../apiConfig';
import { GameweekHistoryDto } from '../type/GameweekHistoryDto';
import { GameweekPickDto } from '../type/GameweekPickDto';
import { GameweekSubDto } from '../type/GameweekSubDto';
import { PicksApiResponse } from './PicksApiResponse';

const getGameweekHistory = async (
    managerId: FantasyManagerId,
    gameweek: EventId
): Promise<GameweekHistoryDto> => {
    const response = await fetchFromApi(FantasyPremierLeagueApi.Picks(managerId, gameweek));

    if (!response.ok) {
        throw new Error(
            `Error fetching gameweek pick for manager ${managerId} on week ${gameweek}: ${response.statusText}`
        );
    }

    const data: PicksApiResponse = await response.json();

    return {
        gameweek,
        points: data.entry_history.points,
        totalPoints: data.entry_history.total_points,
        subs: data.automatic_subs.map((sub): GameweekSubDto => {
            return {
                playerIn: String(sub.element_in) as PremierLeaguePlayerId,
                playerOut: String(sub.element_out) as PremierLeaguePlayerId,
            };
        }),
        picks: data.picks.map((pick): GameweekPickDto => {
            return {
                playerId: String(pick.element) as PremierLeaguePlayerId,
                captain: pick.is_captain,
                viceCaptain: pick.is_vice_captain,
            };
        }),
    };
};

export { getGameweekHistory };
