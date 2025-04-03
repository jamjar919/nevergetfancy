import { EventId, PremierLeaguePlayerId, PremierLeagueTeamId } from '../../../../graphql/Reference';

type PlayerGamePerformanceDto = {
    playerId: PremierLeaguePlayerId;
    gameweek: EventId;
    points: number;
    opposingTeam: PremierLeagueTeamId;
    wasHome: boolean;
    homeTeamScore: number;
    awayTeamScore: number;
    minutes: number;
    goals: number;
    assists: number;
    cleanSheets: number;
    conceded: number;
    ownGoals: number;
    penaltiesSaved: number;
    penaltiesMissed: number;
    yellowCards: number;
    redCards: number;
    saves: number;
    bonus: number;
};

const playerPerformanceDtoFromApi = (
    game: any,
    playerId: PremierLeaguePlayerId
): PlayerGamePerformanceDto => {
    return {
        playerId,
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
    };
};

export { playerPerformanceDtoFromApi, PlayerGamePerformanceDto };
