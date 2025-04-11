import { 
    FantasyLeagueId, 
    FantasyManagerId 
} from '../../../../graphql/Reference';

export interface LeagueApiResponse {
    league: {
        id: FantasyLeagueId;
        name: string;
        created: string;
        closed: boolean;
        max_entries: number | null;
        league_type: string;
        scoring: string;
        admin_entry: number | null;
        start_event: number;
        code_privacy: string;
        has_cup: boolean;
        cup_league: number | null;
        rank: number | null;
    };
    standings: {
        has_next: boolean;
        page: number;
        results: LeagueStandingResult[];
    };
    new_entries: {
        has_next: boolean;
        page: number;
        results: any[];
    };
    last_updated_data: string;
}

export interface LeagueStandingResult {
    id: number;
    event_total: number;
    player_name: string;
    rank: number;
    last_rank: number;
    rank_sort: number;
    total: number;
    entry: FantasyManagerId;
    entry_name: string;
}