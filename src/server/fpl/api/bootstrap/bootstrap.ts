import { EventId, PremierLeaguePlayerId, PremierLeagueTeamId } from '../../../../graphql/Reference';
import { fetchFromApi } from '../../../util/fetchFromApi';
import { FantasyPremierLeagueApi } from '../apiConfig';
import { getCurrentEvent } from '../event/getCurrentEvent';
import { getEventPerformance } from '../event/getEventPerformance';
import { PlayerGamePerformanceDto } from '../type/PlayerGamePerformanceDto';
import { PremierLeaguePlayerDto } from '../type/PremierLeaguePlayerDto';
import { convertToPlayerType } from '../type/PremierLeaguePlayerTypeDto';
import { PremierLeagueTeamDto } from '../type/PremierLeagueTeamDto';
import { BootstrapApiResponse } from './BootstrapApiResponse';

let players: { [key: PremierLeaguePlayerId]: PremierLeaguePlayerDto } = {};
let teams: { [key: PremierLeagueTeamId]: PremierLeagueTeamDto } = {};

type PlayerPerformanceKey = `${PremierLeaguePlayerId}_event_${EventId}`;
const getPlayerPerformanceKey = (
    playerId: PremierLeaguePlayerId,
    eventId: EventId
): PlayerPerformanceKey => `${playerId}_event_${eventId}`;
let playerPerformance: { [key: PlayerPerformanceKey]: PlayerGamePerformanceDto } = {};

// Load the players and teams data from the Fantasy Premier League API
// Fetch the player performance data for all previous gameweeks for speed
const bootstrap = async (): Promise<void> => {
    await prefetchPlayersAndTeams();

    const currentGameweek = await getCurrentEvent();
    const gameweeksToCacheResultsFor = currentGameweek - 1;
    await prefetchPlayerPerformances(gameweeksToCacheResultsFor);
};

const prefetchPlayersAndTeams = async (): Promise<void> => {
    const response = await fetchFromApi(FantasyPremierLeagueApi.Bootstrap());
    const data: BootstrapApiResponse = await response.json();

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

const prefetchPlayerPerformances = async (gameweeksToCacheResultsFor: number): Promise<void> => {
    await Promise.all(
        Array.from({ length: gameweeksToCacheResultsFor }).map(async (_, index) => {
            const eventId = (index + 1) as EventId;
            const data = await getEventPerformance(eventId);

            for (const performance of data) {
                const key = getPlayerPerformanceKey(performance.playerId, eventId);
                playerPerformance[key] = performance;
            }
        })
    );

    console.log(
        `🏃🏽 Player performance data cached up to gameweek ${gameweeksToCacheResultsFor}, results cached for ${Object.keys(playerPerformance).length} performances.`
    );
};

const getPlayerById = (id: PremierLeaguePlayerId): PremierLeaguePlayerDto => {
    return players[id];
};

const getTeamById = (id: PremierLeagueTeamId): PremierLeagueTeamDto => {
    return teams[id];
};

const getPlayerPerformanceById = (
    id: PremierLeaguePlayerId,
    eventId: EventId
): PlayerGamePerformanceDto | undefined => {
    const key = getPlayerPerformanceKey(id, eventId);
    return playerPerformance[key];
};

const getPlayers = () => players;

const getTeams = () => teams;

export {
    bootstrap,
    prefetchPlayersAndTeams,
    prefetchPlayerPerformances,
    getPlayerById,
    getTeamById,
    getPlayerPerformanceById,
    getPlayers,
    getTeams,
};
