import {
    PremierLeaguePlayer,
    PremierLeagueTeam,
    Resolvers,
    FancyResultLine,
    FantasyPlayerGameSummary,
    FantasyLeagueStanding, FantasyLeague, FantasyTeam, FantasyTeamSearchResult
} from "../../graphql/generated/Resolver";
import {FantasyTeamManagerDto} from "../fpl/api/type/FantasyTeamManagerDto";
import {getManager} from "../fpl/api/manager/getManager";
import {FantasyLeagueId, FantasyManagerId, PremierLeaguePlayerId, PremierLeagueTeamId} from "../../graphql/Reference";
import {getPlayerById, getPlayers, getTeamById, getTeams} from "../fpl/api/bootstrap/bootstrap";
import {convertPremierLeagueTeam} from "./converter/convertPremierLeagueTeam";
import {convertPremierLeaguePlayer} from "./converter/convertPremierLeaguePlayer";
import {fancyCalculator} from "../fpl/fancy/fancyCalculator";
import {getLeagueStandings} from "../fpl/api/league/getLeagueStandings";
import {convertFantasyLeagueStanding} from "./converter/convertFantasyLeagueStanding";
import {convertFantasyManager} from "./converter/convertFantasyManager";
import {SearchDao} from "../db/searchDao";
import {convertFantasyTeamSearchResult} from "./converter/convertFantasyTeamSearchResult";

const searchDao = SearchDao.getInstance();

export const resolvers: Resolvers = {
    Query: {
        fantasyTeam: async (_: {}, args: { id: string }) => {
            const managerResponse: FantasyTeamManagerDto = await getManager(args.id as FantasyManagerId);
            return convertFantasyManager(managerResponse);
        },
        premierLeagueTeams: async () => {
            return Object.values(getTeams()).map(convertPremierLeagueTeam);
        },
        premierLeagueTeam: async (_: {}, args: { id: string }) => {
            return convertPremierLeagueTeam(getTeamById(args.id as PremierLeagueTeamId));
        },
        premierLeaguePlayer: async (_: {}, args: { id: string }) => {
            return convertPremierLeaguePlayer(getPlayerById(args.id as PremierLeaguePlayerId));
        },
        fancy: async (_: {}, args: { fantasyTeamId: string }) => {
            return fancyCalculator(args.fantasyTeamId as FantasyManagerId);
        },
        searchFantasyTeam: async (_: {}, args: { query: string }) => {
            return searchDao.search(args.query).map(convertFantasyTeamSearchResult);
        }
    },
    PremierLeagueTeam: {
        players: async (parent: PremierLeagueTeam) => {
            return Object.values(getPlayers())
                .filter(player => player.team === parent.id)
                .map(convertPremierLeaguePlayer);
        }
    },
    PremierLeaguePlayer: {
        team: async (parent: PremierLeaguePlayer) => {
            return convertPremierLeagueTeam(getTeamById(parent.teamId as PremierLeagueTeamId));
        }
    },
    FancyResultLine: {
        captain: async (parent: FancyResultLine) => {
            return convertPremierLeaguePlayer(getPlayerById(parent.captainId as PremierLeaguePlayerId));
        }
    },
    FantasyPlayerGameSummary: {
        opposingTeam: async (parent: FantasyPlayerGameSummary): Promise<PremierLeagueTeam> => {
            return convertPremierLeagueTeam(getTeamById(parent.opposingTeamId as PremierLeagueTeamId));
        }
    },
    FantasyLeague: {
        standings: async (parent: FantasyLeague): Promise<FantasyLeagueStanding[]> => {
            return (await getLeagueStandings(parent.id as FantasyLeagueId))
                .map(convertFantasyLeagueStanding);
        }
    },
    FantasyLeagueStanding: {
        team: async (parent: FantasyLeagueStanding): Promise<FantasyTeam> => {
            const managerResponse: FantasyTeamManagerDto = await getManager(parent.teamId as FantasyManagerId);
            return convertFantasyManager(managerResponse);
        }
    },
    FantasyTeamSearchResult: {
        team: async (parent: FantasyTeamSearchResult): Promise<FantasyTeam> => {
            const managerResponse: FantasyTeamManagerDto = await getManager(parent.id as FantasyManagerId);
            return convertFantasyManager(managerResponse);
        }
    }
}