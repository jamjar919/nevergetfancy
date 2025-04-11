import { 
    EventId, 
    FantasyLeagueId,
    FantasyManagerId, 
    PremierLeagueTeamId 
} from '../../../../graphql/Reference';
import { League } from '../type/response-types/CommonTypes';

export interface ManagerApiResponse {
    id: FantasyManagerId;
    joined_time: string;
    started_event: EventId;
    favourite_team: PremierLeagueTeamId;
    player_first_name: string;
    player_last_name: string;
    player_region_id: number;
    player_region_name: string;
    player_region_iso_code_short: string;
    player_region_iso_code_long: string;
    summary_overall_points: number;
    summary_overall_rank: number;
    summary_event_points: number;
    summary_event_rank: number;
    current_event: EventId;
    name: string; // Team name
    last_deadline_bank: number;
    last_deadline_value: number;
    last_deadline_total_transfers: number;
    leagues: {
        classic: League[];
        h2h: League[];
        cup: {
            matches: any[]; // Not fully defined as it depends on cup status
            status: {
                qualification_event: number;
                qualification_numbers: number;
                qualification_rank: number;
                qualification_state: string;
            };
            cup_league: number | null;
        };
        cup_matches: any[]; // Not fully defined as it depends on cup status
    };
}