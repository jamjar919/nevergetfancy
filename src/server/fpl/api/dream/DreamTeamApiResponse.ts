import { PremierLeaguePlayerId, PremierLeagueTeamId } from '../../../../graphql/Reference';

export interface DreamTeamApiResponse {
    top_player: {
        id: PremierLeaguePlayerId;
        points: number;
    };
    team: DreamTeamPlayer[];
}

export interface DreamTeamPlayer {
    element: PremierLeaguePlayerId;
    points: number;
    position: number;
    team: PremierLeagueTeamId;
    is_captain: boolean;
    is_vice_captain: boolean;
    multiplier: number;
}