import { 
    EventId, 
    FantasyManagerId, 
    PremierLeaguePlayerId 
} from '../../../../graphql/Reference';

export interface PicksApiResponse {
    active_chip: string | null;
    automatic_subs: AutomaticSub[];
    entry_history: EntryHistory;
    picks: Pick[];
}

export interface AutomaticSub {
    entry: FantasyManagerId;
    element_in: PremierLeaguePlayerId;
    element_out: PremierLeaguePlayerId;
    event: EventId;
}

export interface EntryHistory {
    event: EventId;
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
}

export interface Pick {
    element: PremierLeaguePlayerId;
    position: number;
    multiplier: number;
    is_captain: boolean;
    is_vice_captain: boolean;
}