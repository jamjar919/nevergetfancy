import { EventId, FantasyLeagueId, FantasyManagerId, PremierLeagueTeamId } from '../../../../graphql/Reference';
import { fetchFromApi } from '../../../util/fetchFromApi';
import { FantasyPremierLeagueApi } from '../apiConfig';
import { FantasyTeamManagerDto } from '../type/FantasyTeamManagerDto';
import { ManagerApiResponse } from './ManagerApiResponse';

async function getManager(managerId: FantasyManagerId): Promise<FantasyTeamManagerDto> {
    const response = await fetchFromApi(FantasyPremierLeagueApi.Manager(managerId));

    if (!response.ok) {
        throw new Error(`Error fetching manager: ${response.statusText}`);
    }

    const data: ManagerApiResponse = await response.json();

    return {
        id: String(data.id) as FantasyManagerId,
        joinedTime: data.joined_time,
        favouriteTeam: String(data.favourite_team) as PremierLeagueTeamId,
        teamName: data.name,
        playerFirstName: data.player_first_name,
        playerLastName: data.player_last_name,
        playerRegion: {
            regionId: data.player_region_id,
            regionName: data.player_region_name,
            isoCodeShort: data.player_region_iso_code_short,
            isoCodeLong: data.player_region_iso_code_long,
        },
        startedEvent: data.started_event as EventId,
        currentEvent: data.current_event as EventId,
        summaryOverallPoints: data.summary_overall_points,
        summaryOverallRank: data.summary_overall_rank,
        summaryEventPoints: data.summary_event_points,
        summaryEventRank: data.summary_event_rank,
        lastDeadlineBank: data.last_deadline_bank,
        lastDeadlineValue: data.last_deadline_value,
        lastDeadlineTotalTransfers: data.last_deadline_total_transfers,
        leagues: (data?.leagues?.classic ?? [])
            .filter((league) => league.league_type === 'x') // only personal leagues
            .map((league) => {
                return {
                    id: String(league.id) as FantasyLeagueId,
                    name: league.name,
                };
            }),
    };
}

export { getManager };
