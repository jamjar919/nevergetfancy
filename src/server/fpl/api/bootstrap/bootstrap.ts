import { PremierLeaguePlayerId, PremierLeagueTeamId } from '../../../../graphql/Reference';
import { fetchFromApi } from '../../../util/fetchFromApi';
import { FantasyPremierLeagueApi } from '../apiConfig';
import { PremierLeaguePlayerDto } from '../type/PremierLeaguePlayerDto';
import { convertToPlayerType } from '../type/PremierLeaguePlayerTypeDto';
import { PremierLeagueTeamDto } from '../type/PremierLeagueTeamDto';
import { BootstrapApiResponse } from './BootstrapApiResponse';

let players: { [key: PremierLeaguePlayerId]: PremierLeaguePlayerDto } = {};
let teams: { [key: PremierLeagueTeamId]: PremierLeagueTeamDto } = {};

const fetchPlayersAndTeams = async (): Promise<void> => {
    const response = await fetchFromApi(FantasyPremierLeagueApi.Bootstrap());
    const data = (await response.json()) as BootstrapApiResponse;

    data.elements.map((player) => {
        const id = String(player.id) as PremierLeaguePlayerId;

        players[id] = {
            id,
            firstName: player.first_name,
            secondName: player.second_name,
            webName: player.web_name,
            team: String(player.team) as PremierLeagueTeamId,
            nowCost: player.now_cost,
            totalPoints: player.total_points,
            goalsScored: player.goals_scored,
            assists: player.assists,
            cleanSheets: player.clean_sheets,
            bonus: player.bonus,
            type: convertToPlayerType(player.element_type),
        };
    });

    data.teams.forEach((team) => {
        const id = String(team.id) as PremierLeagueTeamId;

        teams[id] = {
            id,
            name: team.name,
            played: team.played,
            position: team.position,
            shortName: team.short_name,
        };
    });
};

const getPlayerById = (id: PremierLeaguePlayerId): PremierLeaguePlayerDto => {
    return players[id];
};

const getTeamById = (id: PremierLeagueTeamId): PremierLeagueTeamDto => {
    return teams[id];
};

const getPlayers = () => players;

const getTeams = () => teams;

export { fetchPlayersAndTeams, getPlayerById, getTeamById, getPlayers, getTeams };
