import {
    EventId,
    FantasyLeagueId,
    FantasyManagerId,
    PremierLeaguePlayerId,
} from '../../../graphql/Reference';

const baseApi = 'https://fantasy.premierleague.com/api';

const FantasyPremierLeagueApi = {
    /** All players and team ids + names */
    Bootstrap: () => `${baseApi}/bootstrap-static/`,
    /** Basic manager information */
    Manager: (managerId: FantasyManagerId) => `${baseApi}/entry/${managerId}/`,
    /** What players did the manager pick for the given gameweek */
    Picks: (managerId: FantasyManagerId, eventId: EventId) =>
        `${baseApi}/entry/${managerId}/event/${eventId}/picks/`,
    /** The history of that players performance across all gameweeks */
    PlayerSummary: (playerId: PremierLeaguePlayerId) => `${baseApi}/element-summary/${playerId}/`,
    /** The standings for a FPL league */
    League: (leagueId: FantasyLeagueId, page: number = 1) =>
        `${baseApi}/leagues-classic/${leagueId}/standings/?page_standings=${page}`,
    /** The best players across a given gameweek in each position */
    DreamTeam: (gameweek: EventId) => `${baseApi}/dream-team/${gameweek}/`,
    /** All player score information for a given gameweek */
    LiveEvent: (eventId: EventId) => `${baseApi}/event/${eventId}/live/`,
};

export { FantasyPremierLeagueApi };
