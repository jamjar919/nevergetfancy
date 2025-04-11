import { 
    EventId, 
    PremierLeaguePlayerId, 
    PremierLeagueTeamId 
} from '../../../../graphql/Reference';
import { PlayerStats } from '../type/response-types/CommonTypes';

export interface PlayerSummaryApiResponse {
    fixtures: PlayerFixture[];
    history: PlayerHistoryEntry[];
    history_past: PlayerHistoryPastEntry[];
}

export interface PlayerFixture {
    id: number;
    code: number;
    team_h: PremierLeagueTeamId;
    team_h_score: number | null;
    team_a: PremierLeagueTeamId;
    team_a_score: number | null;
    event: EventId;
    finished: boolean;
    minutes: number;
    provisional_start_time: boolean;
    kickoff_time: string;
    event_name: string;
    is_home: boolean;
    difficulty: number;
}

export interface PlayerHistoryEntry extends PlayerStats {
    element: PremierLeaguePlayerId;
    fixture: number;
    opponent_team: PremierLeagueTeamId;
    team_h_score: number | null;
    team_a_score: number | null;
    round: EventId;
    was_home: boolean;
    kickoff_time: string;
    team_h: PremierLeagueTeamId;
    team_a: PremierLeagueTeamId;
    value: number;
    transfers_balance: number;
    selected: number;
    transfers_in: number;
    transfers_out: number;
}

export interface PlayerHistoryPastEntry {
    season_name: string;
    element_code: number;
    start_cost: number;
    end_cost: number;
    total_points: number;
    minutes: number;
    goals_scored: number;
    assists: number;
    clean_sheets: number;
    goals_conceded: number;
    own_goals: number;
    penalties_saved: number;
    penalties_missed: number;
    yellow_cards: number;
    red_cards: number;
    saves: number;
    bonus: number;
    bps: number;
    influence: string;
    creativity: string;
    threat: string;
    ict_index: string;
}