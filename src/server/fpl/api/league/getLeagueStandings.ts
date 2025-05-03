import { FantasyLeagueId, FantasyManagerId } from '../../../../graphql/Reference';
import { fetchFromApi } from '../../../util/fetchFromApi';
import { FantasyPremierLeagueApi } from '../apiConfig';
import { FantasyTeamLeagueStandingDto } from '../type/FantasyTeamLeagueStandingDto';
import { LeagueApiResponse, LeagueStandingResult } from './LeagueApiResponse';

const convertStandings = (
    standings: LeagueApiResponse['standings']
): FantasyTeamLeagueStandingDto[] => {
    return standings.results.map((standing: LeagueStandingResult) => {
        return {
            teamId: String(standing.entry) as FantasyManagerId,
            rank: standing.rank,
            lastRank: standing.last_rank,
            total: standing.total,
            teamName: standing.entry_name,
            playerName: standing.player_name,
        };
    });
};

const DEFAULT_MAX_STANDINGS_TO_FETCH = 250;

const getLeagueStandings = async (
    leagueId: FantasyLeagueId,
    maxStandings = DEFAULT_MAX_STANDINGS_TO_FETCH
): Promise<FantasyTeamLeagueStandingDto[]> => {
    let currentPage = 1;
    const response = await fetchFromApi(FantasyPremierLeagueApi.League(leagueId, currentPage));

    if (!response.ok) {
        throw new Error(`Error fetching league: ${response.statusText}`);
    }

    let data: LeagueApiResponse = await response.json();

    const standings = convertStandings(data.standings);

    while (data.standings.has_next && standings.length < maxStandings) {
        currentPage++;

        data = await fetchFromApi(FantasyPremierLeagueApi.League(leagueId, currentPage)).then(
            (res) => res.json()
        );

        standings.push(...convertStandings(data.standings));
    }

    return standings;
};

export { getLeagueStandings };
