import {PremierLeaguePlayerId, PremierLeagueTeamId} from "../../../../graphql/Reference";
import {PremierLeaguePlayerTypeDto} from "./PremierLeaguePlayerTypeDto";

type PremierLeaguePlayerDto = {
    id: PremierLeaguePlayerId;
    firstName: string;
    secondName: string;
    webName: string;
    team: PremierLeagueTeamId;
    nowCost: number;
    totalPoints: number;
    goalsScored: number;
    type: PremierLeaguePlayerTypeDto;
}

export { PremierLeaguePlayerDto }