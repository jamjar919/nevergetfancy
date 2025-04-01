import { EventId, PremierLeaguePlayerId, PremierLeagueTeamId } from '../../../../graphql/Reference';

type PlayerPreviousGameDto = {
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

export { PlayerPreviousGameDto };
