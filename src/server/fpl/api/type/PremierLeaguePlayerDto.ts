import {PremierLeaguePlayerId, PremierLeagueTeamId} from "../../../../graphql/Reference";
import {PremierLeaguePlayerType} from "./PremierLeaguePlayerType";

type PremierLeaguePlayerDto = {
    id: PremierLeaguePlayerId;
    firstName: string;
    secondName: string;
    webName: string;
    team: PremierLeagueTeamId;
    nowCost: number;
    totalPoints: number;
    goalsScored: number;
    type: PremierLeaguePlayerType;
}

export { PremierLeaguePlayerDto }