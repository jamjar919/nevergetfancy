import {FantasyManagerId} from "../../../graphql/Reference";

const baseApi = 'https://fantasy.premierleague.com/api';

const FantasyPremierLeagueApi = {
    Manager: (managerId: FantasyManagerId) => `${baseApi}/entry/${managerId}/`,
}

export { FantasyPremierLeagueApi }