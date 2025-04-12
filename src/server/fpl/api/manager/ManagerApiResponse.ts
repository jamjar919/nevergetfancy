import { OffsetDateTime } from '../../../../graphql/Reference';

export type ManagerApiResponse = {
    id: number; // FantasyManagerId
    joined_time: OffsetDateTime;
    favourite_team: number;
    name: string;
    player_first_name: string;
    player_last_name: string;
    player_region_id: number;
    player_region_name: string;
    player_region_iso_code_short: string;
    player_region_iso_code_long: string;
    started_event: number;
    current_event: number;
    summary_overall_points: number;
    summary_overall_rank: number;
    summary_event_points: number;
    summary_event_rank: number;
    last_deadline_bank: number;
    last_deadline_value: number;
    last_deadline_total_transfers: number;
    leagues: {
        classic: Array<{
            id: number; // FantasyLeagueId
            name: string;
            league_type: string;
            created: string;
            closed: boolean;
            rank: number | null;
        }>;
    };
};
