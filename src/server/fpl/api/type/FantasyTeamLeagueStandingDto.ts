import {FantasyManagerId} from "../../../../graphql/Reference";

type FantasyTeamLeagueStandingDto = {
    teamId: FantasyManagerId;
    rank: number;
    lastRank: number;
    total: number;
};

export { FantasyTeamLeagueStandingDto }