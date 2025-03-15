import {EventId, PremierLeaguePlayerId} from "../../../../graphql/Reference";
import {PlayerPreviousGameDto} from "../type/PlayerPreviousGameDto";
import {getPlayerPreviousGames} from "./getPlayerSummary";

const getPlayerPreviousGame = async (playerId: PremierLeaguePlayerId, gameweek: EventId): Promise<PlayerPreviousGameDto | undefined> => {
    const previousGames = await getPlayerPreviousGames(playerId);

    return previousGames.find(game => game.gameweek === gameweek);
}

export { getPlayerPreviousGame }