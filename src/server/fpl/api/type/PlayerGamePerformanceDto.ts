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
    game: Record<string, any>,
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

const mergePlayerGamePerformance = (
    performances: PlayerGamePerformanceDto[]
): PlayerGamePerformanceDto => {
    return performances.reduce((a, b) => ({
        ...a,
        points: a.points + b.points,
        homeTeamScore: a.homeTeamScore + b.homeTeamScore,
        awayTeamScore: a.awayTeamScore + b.awayTeamScore,
        minutes: a.minutes + b.minutes,
        goals: a.goals + b.goals,
        assists: a.assists + b.assists,
        cleanSheets: a.cleanSheets + b.cleanSheets,
        conceded: a.conceded + b.conceded,
        ownGoals: a.ownGoals + b.ownGoals,
        penaltiesSaved: a.penaltiesSaved + b.penaltiesSaved,
        penaltiesMissed: a.penaltiesMissed + b.penaltiesMissed,
        yellowCards: a.yellowCards + b.yellowCards,
        redCards: a.redCards + b.redCards,
        saves: a.saves + b.saves,
        bonus: a.bonus + b.bonus,
    }));
}

export { playerPerformanceDtoFromApi, mergePlayerGamePerformance, PlayerGamePerformanceDto };
