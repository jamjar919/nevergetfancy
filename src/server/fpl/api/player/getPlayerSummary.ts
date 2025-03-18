import {FantasyPremierLeagueApi} from "../apiConfig";
import {PlayerPreviousGameDto} from "../type/PlayerPreviousGameDto";
import {EventId, PremierLeaguePlayerId} from "../../../../graphql/Reference";
import {fetchFromApi} from "../../../util/fetchFromApi";

const getPlayerPreviousGames = async (playerId: PremierLeaguePlayerId): Promise<PlayerPreviousGameDto[]> => {
    const response = await fetchFromApi(FantasyPremierLeagueApi.PlayerSummary(playerId));

    if (!response.ok) {
        throw new Error(`Error fetching player summary for player ${playerId}: ${response.statusText}`);
    }

    const data = await response.json();

    return data.history.map((game: any) => ({
        gameweek: game.round as EventId,
        points: game.total_points,
        opposingTeam: game.opponent_team,
        wasHome: game.was_home,
        homeTeamScore: game.team_h_score,
        awayTeamScore: game.team_a_score,
        minutes: game.minutes,
        goals: game.goals_scored,
        assists: game.assists,
        cleanSheets: game.clean_sheets,
        conceded: game.goals_conceded,
        ownGoals: game.own_goals,
        penaltiesSaved: game.penalties_saved,
        penaltiesMissed: game.penalties_missed,
        yellowCards: game.yellow_cards,
        redCards: game.red_cards,
        saves: game.saves,
        bonus: game.bonus,
    }));
}

export { getPlayerPreviousGames }