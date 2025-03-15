import {PremierLeaguePlayerId} from "../../../../graphql/Reference";

type GameweekPickDto = {
    playerId: PremierLeaguePlayerId;
    captain: boolean;
    viceCaptain: boolean;
};

export { GameweekPickDto };