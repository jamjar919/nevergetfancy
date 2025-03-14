import {FantasyManagerId} from "../../../graphql/Reference";

const baseApi = 'https://fantasy.premierleague.com/api';

const FantasyPremierLeagueApi = {
    Bootstrap: () => `${baseApi}/bootstrap-static/`,
    Manager: (managerId: FantasyManagerId) => `${baseApi}/entry/${managerId}/`,
}

export { FantasyPremierLeagueApi }