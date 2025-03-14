import {PremierLeaguePlayerId, PremierLeagueTeamId} from "../../../../graphql/Reference";
import {PremierLeaguePlayerDto} from "../type/PremierLeaguePlayerDto";
import {PremierLeagueTeamDto} from "../type/PremierLeagueTeamDto";
import {FantasyPremierLeagueApi} from "../apiConfig";
import {convertToPlayerType} from "../type/PremierLeaguePlayerType";

let players: { [key: PremierLeaguePlayerId]: PremierLeaguePlayerDto } = {};
let teams: { [key: PremierLeagueTeamId]: PremierLeagueTeamDto } = {};

const fetchPlayersAndTeams = async (): Promise<void> => {
    const response = await fetch(FantasyPremierLeagueApi.Bootstrap());
    const data = await response.json();

    data.elements.map((player: any) => {
        players[player.id] = {
            id: player.id,
            firstName: player.first_name,
            secondName: player.second_name,
            webName: player.web_name,
            team: player.team,
            nowCost: player.now_cost,
            totalPoints: player.total_points,
            goalsScored: player.goals_scored,
            type: convertToPlayerType(player.element_type),
        };
    });

    data.teams.forEach((team: any) => {
        teams[team.id] = {
            id: team.id,
            name: team.name,
            played: team.played,
            position: team.position,
            shortName: team.short_name
        };
    });
};

const getPlayerById = (id: PremierLeaguePlayerId): PremierLeaguePlayerDto => {
    return players[id];
}

const getTeamById = (id: PremierLeagueTeamId): PremierLeagueTeamDto => {
    return teams[id];
}

const getPlayers = () => players;

const getTeams =  () => teams;


export { fetchPlayersAndTeams, getPlayerById, getTeamById, getPlayers, getTeams }