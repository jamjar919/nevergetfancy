import { EventId, FantasyManagerId } from '../../../../graphql/Reference';
import { fetchFromApi } from '../../../util/fetchFromApi';
import { FantasyPremierLeagueApi } from '../apiConfig';
import { GameweekHistoryDto } from '../type/GameweekHistoryDto';
import { GameweekPickDto } from '../type/GameweekPickDto';
import { GameweekSubDto } from '../type/GameweekSubDto';

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

    const data: any = await response.json();

    return {
        gameweek,
        points: data.entry_history.points,
        totalPoints: data.entry_history.total_points,
        subs: data.automatic_subs.map((sub: any): GameweekSubDto => {
            return {
                playerIn: sub.element_in,
                playerOut: sub.element_out,
            };
        }),
        picks: data.picks.map((pick: any): GameweekPickDto => {
            return {
                playerId: pick.element,
                captain: pick.is_captain,
                viceCaptain: pick.is_vice_captain,
            };
        }),
    };
};

export { getGameweekHistory };
