import { FantasyPlayerGameSummary } from '../../../graphql/generated/Resolver';
import { PlayerGamePerformanceDto } from '../../fpl/api/type/PlayerGamePerformanceDto';

const convertGameSummary = (dto: PlayerGamePerformanceDto): FantasyPlayerGameSummary => {
    return {
        gameweek: dto.gameweek,
        points: dto.points,
        opposingTeamId: dto.opposingTeam,
        wasHome: dto.wasHome,
        homeTeamScore: dto.homeTeamScore,
        awayTeamScore: dto.awayTeamScore,
        minutes: dto.minutes,
        goals: dto.goals,
        assists: dto.assists,
        cleanSheets: dto.cleanSheets,
        conceded: dto.conceded,
        ownGoals: dto.ownGoals,
        penaltiesSaved: dto.penaltiesSaved,
        penaltiesMissed: dto.penaltiesMissed,
        yellowCards: dto.yellowCards,
        redCards: dto.redCards,
        saves: dto.saves,
        bonus: dto.bonus,
    };
};

export { convertGameSummary };
