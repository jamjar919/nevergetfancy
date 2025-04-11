// Bootstrap API response using type definitions and basic types
export type BootstrapApiResponse = {
    events: Event[];
    game_settings: GameSettings;
    phases: Phase[];
    teams: Team[];
    total_players: number;
    elements: Player[];
    element_stats: ElementStat[];
    element_types: ElementType[];
};

type Event = {
    id: number; // EventId
    name: string;
    deadline_time: string;
    average_entry_score: number;
    finished: boolean;
    data_checked: boolean;
    highest_scoring_entry: number | null;
    deadline_time_epoch: number;
    deadline_time_game_offset: number;
    highest_score: number | null;
    is_previous: boolean;
    is_current: boolean;
    is_next: boolean;
    chip_plays: ChipPlay[];
    most_selected: number | null; // PremierLeaguePlayerId
    most_transferred_in: number | null; // PremierLeaguePlayerId
    top_element: number | null; // PremierLeaguePlayerId
    top_element_info: TopElementInfo | null;
    transfers_made: number;
    most_captained: number | null; // PremierLeaguePlayerId
    most_vice_captained: number | null; // PremierLeaguePlayerId
};

type ChipPlay = {
    chip_name: string;
    num_played: number;
};

type TopElementInfo = {
    id: number; // PremierLeaguePlayerId
    points: number;
};

type GameSettings = {
    league_join_private_max: number;
    league_join_public_max: number;
    league_max_size_public_classic: number;
    league_max_size_public_h2h: number;
    league_max_size_private_h2h: number;
    league_max_ko_rounds_private_h2h: number;
    league_prefix_public: string;
    league_points_h2h_win: number;
    league_points_h2h_lose: number;
    league_points_h2h_draw: number;
    squad_squadplay: number;
    squad_squadsize: number;
    squad_team_limit: number;
    squad_total_spend: number;
    ui_currency_multiplier: number;
    ui_use_special_shirts: boolean;
    ui_special_shirt_exclusions: any[];
    stats_form_days: number;
    sys_vice_captain_enabled: boolean;
    transfers_cap: number;
    transfers_sell_on_fee: number;
    cup_start_event_id: number | null;
    cup_stop_event_id: number | null;
    cup_qualifying_method: string | null;
    cup_type: string | null;
    squad_wildcard_limit: number;
    squad_bboost_limit: number;
    squad_freehit_limit: number;
    squad_tc_limit: number;
};

type Phase = {
    id: number;
    name: string;
    start_event: number;
    stop_event: number;
};

type Team = {
    id: number; // PremierLeagueTeamId
    name: string;
    short_name: string;
    code: number;
    strength: number;
    strength_overall_home: number;
    strength_overall_away: number;
    strength_attack_home: number;
    strength_attack_away: number;
    strength_defence_home: number;
    strength_defence_away: number;
    pulse_id: number;
    played: number;
    win: number;
    draw: number;
    loss: number;
    form: string | null;
    position: number;
    points: number;
};

type Player = {
    id: number; // PremierLeaguePlayerId
    chance_of_playing_next_round: number | null;
    chance_of_playing_this_round: number | null;
    code: number;
    cost_change_event: number;
    cost_change_event_fall: number;
    cost_change_start: number;
    cost_change_start_fall: number;
    dreamteam_count: number;
    element_type: number;
    ep_next: string | null;
    ep_this: string | null;
    event_points: number;
    first_name: string;
    form: string;
    in_dreamteam: boolean;
    news: string;
    news_added: string | null;
    now_cost: number;
    photo: string;
    points_per_game: string;
    second_name: string;
    selected_by_percent: string;
    special: boolean;
    squad_number: number | null;
    status: string;
    team: number; // PremierLeagueTeamId
    team_code: number;
    total_points: number;
    transfers_in: number;
    transfers_in_event: number;
    transfers_out: number;
    transfers_out_event: number;
    value_form: string;
    value_season: string;
    web_name: string;
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
    influence_rank: number;
    influence_rank_type: number;
    creativity_rank: number;
    creativity_rank_type: number;
    threat_rank: number;
    threat_rank_type: number;
    ict_index_rank: number;
    ict_index_rank_type: number;
    corners_and_indirect_freekicks_order: number | null;
    corners_and_indirect_freekicks_text: string | null;
    direct_freekicks_order: number | null;
    direct_freekicks_text: string | null;
    penalties_order: number | null;
    penalties_text: string | null;
};

type ElementStat = {
    label: string;
    name: string;
};

type ElementType = {
    id: number;
    plural_name: string;
    plural_name_short: string;
    singular_name: string;
    singular_name_short: string;
    squad_select: number;
    squad_min_play: number;
    squad_max_play: number;
    element_count: number;
};
