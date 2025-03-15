import {PremierLeaguePlayer, PremierLeagueTeam, Resolvers, FancyResultLine, FantasyPlayerGameSummary} from "../../graphql/generated/Resolver";
import {FantasyTeamManagerDto} from "../fpl/api/type/FantasyTeamManagerDto";
import {getManager} from "../fpl/api/manager/getManager";
import {FantasyManagerId, PremierLeaguePlayerId, PremierLeagueTeamId} from "../../graphql/Reference";
import {getPlayerById, getPlayers, getTeamById, getTeams} from "../fpl/api/bootstrap/bootstrap";
import {convertPremierLeagueTeam} from "./converter/convertPremierLeagueTeam";
import {convertPremierLeaguePlayer} from "./converter/convertPremierLeaguePlayer";
import {fancyCalculator} from "../fpl/fancy/fancyCalculator";

export const resolvers: Resolvers = {
    Query: {
        fantasyTeam: async (_: {}, args: { id: string }) => {
            const managerResponse: FantasyTeamManagerDto = await getManager(args.id as FantasyManagerId);

            return {
                id: managerResponse.id,
                name: managerResponse.teamName,
                manager: {
                    name: managerResponse.playerFirstName + " " + managerResponse.playerLastName
                }
            }
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
    }
}