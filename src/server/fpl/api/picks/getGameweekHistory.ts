import {EventId, FantasyManagerId} from "../../../../graphql/Reference";
import {FantasyPremierLeagueApi} from "../apiConfig";
import {GameweekHistoryDto} from "../type/GameweekHistoryDto";

const getGameweekHistory = async (
    managerId: FantasyManagerId,
    gameweek: EventId
): Promise<GameweekHistoryDto> => {
    const response = await fetch(FantasyPremierLeagueApi.Picks(managerId, gameweek));

    if (!response.ok) {
        throw new Error(`Error fetching gameweek pick for manager ${managerId} on week ${gameweek}: ${response.statusText}`);
    }

    const data = await response.json();

    return {
        gameweek,
        points: data.entry_history.points,
        totalPoints: data.entry_history.total_points,
        picks: data.picks.map((pick: any) => {
            return {
                playerId: pick.element,
                captain: pick.is_captain,
                viceCaptain: pick.is_vice_captain
            };
        })
    }
}

export { getGameweekHistory }