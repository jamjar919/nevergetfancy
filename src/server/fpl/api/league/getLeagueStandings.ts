import {FantasyLeagueId} from "../../../../graphql/Reference";
import {FantasyTeamLeagueStandingDto} from "../type/FantasyTeamLeagueStandingDto";
import {FantasyPremierLeagueApi} from "../apiConfig";
import {fetchFromApi} from "../../../util/fetchFromApi";

const convertStandings = (standings: any): FantasyTeamLeagueStandingDto[] => {
    return standings.results.map((standing) => {
        return {
            teamId: standing.entry,
            rank: standing.rank,
            lastRank: standing.last_rank,
            total: standing.total
        }
    });
}

const MAX_STANDINGS_TO_FETCH = 250;

const getLeagueStandings = async (
    leagueId: FantasyLeagueId
): Promise<FantasyTeamLeagueStandingDto[]> => {
    let currentPage = 1;
    const response = await fetchFromApi(FantasyPremierLeagueApi.League(leagueId, currentPage));

    if (!response.ok) {
        throw new Error(`Error fetching league: ${response.statusText}`);
    }

    let data = await response.json();

    const standings = convertStandings(data.standings);

    while (data.standings.has_next && standings.length < MAX_STANDINGS_TO_FETCH) {
        currentPage++;

        data = await fetchFromApi(FantasyPremierLeagueApi.League(leagueId, currentPage)).then((res) => res.json());

        standings.push(...convertStandings(data.standings));
    }

    return standings;
}

export { getLeagueStandings }