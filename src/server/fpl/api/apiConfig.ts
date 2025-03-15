import {EventId, FantasyManagerId, PremierLeaguePlayerId} from "../../../graphql/Reference";

const baseApi = 'https://fantasy.premierleague.com/api';

const FantasyPremierLeagueApi = {
    Bootstrap: () => `${baseApi}/bootstrap-static/`,
    Manager: (managerId: FantasyManagerId) => `${baseApi}/entry/${managerId}/`,
    Picks: (managerId: FantasyManagerId, eventId: EventId) => `${baseApi}/entry/${managerId}/event/${eventId}/picks/`,
    PlayerSummary: (playerId: PremierLeaguePlayerId) => `${baseApi}/element-summary/${playerId}/`,
}

export { FantasyPremierLeagueApi }