export type DreamTeamApiResponse = {
    top_player: {
        id: number; // PremierLeaguePlayerId
        points: number;
    };
    team: DreamTeamPlayer[];
};

export type DreamTeamPlayer = {
    element: number; // PremierLeaguePlayerId
    points: number;
    position: number;
    team: number; // PremierLeagueTeamId
    is_captain: boolean;
    is_vice_captain: boolean;
    multiplier: number;
};
