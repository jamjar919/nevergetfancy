export type PicksApiResponse = {
    active_chip: string | null;
    automatic_subs: AutomaticSub[];
    entry_history: EntryHistory;
    picks: Pick[];
};

export type AutomaticSub = {
    entry: number; // FantasyManagerId
    element_in: number; // PremierLeaguePlayerId
    element_out: number; // PremierLeaguePlayerId
    event: number; // EventId
};

export type EntryHistory = {
    event: number; // EventId
    points: number;
    total_points: number;
    rank: number;
    rank_sort: number;
    overall_rank: number;
    bank: number;
    value: number;
    event_transfers: number;
    event_transfers_cost: number;
    points_on_bench: number;
};

export type Pick = {
    element: number; // PremierLeaguePlayerId
    position: number;
    multiplier: number;
    is_captain: boolean;
    is_vice_captain: boolean;
};