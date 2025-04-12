export type PlayerStats = {
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
    influence: number;
    creativity: number;
    threat: number;
    ict_index: number;
    total_points: number;
    in_dreamteam: boolean;
};

export type PlayerRegion = {
    id: number;
    name: string;
    iso_code_short: string;
    iso_code_long: string;
};

export type League = {
    id: number; // FantasyLeagueId
    name: string;
    created: string;
    closed: boolean;
    rank: number | null;
    max_entries: number | null;
    league_type: string;
    scoring: string;
    admin_entry: number | null;
    start_event: number;
    code_privacy: string;
    has_cup: boolean;
    cup_league: number | null;
    cup_qualified: boolean | null;
    entry_can_leave: boolean;
    entry_can_admin: boolean;
    entry_can_invite: boolean;
};
