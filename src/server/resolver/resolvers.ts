import {
    FantasyLeagueId,
    FantasyManagerId,
    PremierLeaguePlayerId,
    PremierLeagueTeamId,
} from '../../graphql/Reference';
import {
    PremierLeaguePlayer,
    PremierLeagueTeam,
    Resolvers,
    FantasyPlayerGameSummary,
    FantasyLeagueStanding,
    FantasyLeague,
    FantasyTeam,
    FantasyTeamSearchResult,
    FancyPickLine,
    FancyComparison,
    FancyResult,
    FancyResultLine,
} from '../../graphql/generated/Resolver';
import { SearchDao } from '../db/searchDao';
import { getPlayerById, getPlayers, getTeamById, getTeams } from '../fpl/api/bootstrap/bootstrap';
import { getLeagueStandings } from '../fpl/api/league/getLeagueStandings';
import { getManager } from '../fpl/api/manager/getManager';
import { FantasyTeamManagerDto } from '../fpl/api/type/FantasyTeamManagerDto';
import {
    fancyComparisonCalculator,
    FancyComparisonTypeEnum,
} from '../fpl/fancy/fancyComparisonCalculator';
import { teamScoresCalculator } from '../fpl/fancy/teamScoresCalculator';
import { convertFantasyLeagueStanding } from './converter/convertFantasyLeagueStanding';
import { convertFantasyManager } from './converter/convertFantasyManager';
import { convertFantasyTeamSearchResult } from './converter/convertFantasyTeamSearchResult';
import { convertPremierLeaguePlayer } from './converter/convertPremierLeaguePlayer';
import { convertPremierLeagueTeam } from './converter/convertPremierLeagueTeam';

const searchDao = SearchDao.getInstance();

export const resolvers: Resolvers = {
    Query: {
        fantasyTeam: async (_: {}, args: { id: string }) => {
            const managerResponse: FantasyTeamManagerDto = await getManager(
                args.id as FantasyManagerId
            );
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
            return teamScoresCalculator(args.fantasyTeamId as FantasyManagerId);
        },
        searchFantasyTeam: async (_: {}, args: { query: string }) => {
            const results = await searchDao.search(args.query);
            return results.map(convertFantasyTeamSearchResult);
        },
    },
    PremierLeagueTeam: {
        players: async (parent: PremierLeagueTeam) => {
            return Object.values(getPlayers())
                .filter((player) => player.team === parent.id)
                .map(convertPremierLeaguePlayer);
        },
    },
    PremierLeaguePlayer: {
        team: async (parent: PremierLeaguePlayer) => {
            return convertPremierLeagueTeam(getTeamById(parent.teamId as PremierLeagueTeamId));
        },
    },
    FancyResult: {
        comparison: async (
            parent: FancyResult,
            args: { comparison?: string | null }
        ): Promise<FancyComparison> => {
            const comparison =
                (args.comparison as FancyComparisonTypeEnum) || FancyComparisonTypeEnum.Salah;
            return fancyComparisonCalculator(
                parent.teamId as FantasyManagerId,
                parent.captainScores,
                comparison
            );
        },
    },
    FancyPickLine: {
        captain: async (parent: FancyPickLine) => {
            return convertPremierLeaguePlayer(
                getPlayerById(parent.captainId as PremierLeaguePlayerId)
            );
        },
    },
    FancyResultLine: {
        player: async (parent: FancyResultLine) => {
            return convertPremierLeaguePlayer(
                getPlayerById(parent.playerId as PremierLeaguePlayerId)
            );
        },
    },
    FantasyPlayerGameSummary: {
        opposingTeam: async (parent: FantasyPlayerGameSummary): Promise<PremierLeagueTeam> => {
            return convertPremierLeagueTeam(
                getTeamById(parent.opposingTeamId as PremierLeagueTeamId)
            );
        },
    },
    FantasyLeague: {
        standings: async (parent: FantasyLeague): Promise<FantasyLeagueStanding[]> => {
            return (await getLeagueStandings(parent.id as FantasyLeagueId)).map(
                convertFantasyLeagueStanding
            );
        },
    },
    FantasyLeagueStanding: {
        team: async (parent: FantasyLeagueStanding): Promise<FantasyTeam> => {
            const managerResponse: FantasyTeamManagerDto = await getManager(
                parent.teamId as FantasyManagerId
            );
            return convertFantasyManager(managerResponse);
        },
    },
    FantasyTeamSearchResult: {
        team: async (parent: FantasyTeamSearchResult): Promise<FantasyTeam> => {
            const managerResponse: FantasyTeamManagerDto = await getManager(
                parent.id as FantasyManagerId
            );
            return convertFantasyManager(managerResponse);
        },
    },
};
