import {EventId, FantasyManagerId, PremierLeaguePlayerId} from "../../../graphql/Reference";
import {getManager} from "../api/manager/getManager";
import {getArrayWithNumbersInRange} from "../../util/getArrayWithNumbersInRange";
import {getGameweekHistory} from "../api/picks/getGameweekHistory";
import {getPlayerPreviousGame} from "../api/player/getPlayerPreviousGame";
import {SALAH_PLAYER_ID} from "./fancyMan";
import {GameweekHistoryDto} from "../api/type/GameweekHistoryDto";
import {FancyResult, FancyResultLine} from "../../../graphql/generated/Resolver";
import {convertGameSummary} from "../../resolver/converter/convertGameSummary";

const fancyCalculator = async (managerId: FantasyManagerId): Promise<FancyResult> => {
    const manager = await getManager(managerId);

    const activeGameweeks = getArrayWithNumbersInRange(manager.startedEvent, manager.currentEvent);

    const history = await Promise.all(
        activeGameweeks.map(async (gameweek: number) => getGameweekHistory(managerId, gameweek as EventId))
    );

    const fancyResults = await Promise.all(history.map(async (week) => {
        const captainId = getCaptainForGameweek(week);

        const gotFancy = String(captainId) !== SALAH_PLAYER_ID;

        const hadSalah = week.picks.some(pick => String(pick.playerId) === SALAH_PLAYER_ID);

        const captainGameSummary = await getPlayerPreviousGame(captainId, week.gameweek);
        const salahGameSummary = await getPlayerPreviousGame(SALAH_PLAYER_ID, week.gameweek);

        const pointDifference = (captainGameSummary?.points ?? 0) - (salahGameSummary?.points ?? 0);

        const result: FancyResultLine = {
            gameweek: week.gameweek,
            gotFancy,
            pointDifference,
            hadSalah,
            captainId: String(captainId),
        }

        result.captainGameSummary = convertGameSummary(captainGameSummary);
        result.salahGameSummary = convertGameSummary(salahGameSummary);

        return result;
    }));

    // For convenience, sort by the gameweek in reverse order
    fancyResults.sort((a, b) => b.gameweek - a.gameweek);

    const totalPointDifference = fancyResults.reduce((acc, result) => acc + result.pointDifference, 0);
    const timesGotFancy = fancyResults.filter(result => result.gotFancy).length;

    const worstGameweek = fancyResults.reduce((acc, result) => {
        if (result.pointDifference < acc.pointDifference) {
            return result;
        }

        return acc;
    })

    return {
        totalPointDifference,
        timesGotFancy,
        worstGameweek: worstGameweek.gameweek,
        worstGameweekScore: worstGameweek.pointDifference,
        lines: fancyResults
    }
}

// TODO: how do substitutes and vice captains work in the API?
const getCaptainForGameweek = (week: GameweekHistoryDto): PremierLeaguePlayerId => {
    const captain = week.picks.find(pick => pick.captain);

    if (!captain) {
        throw new Error(`No captain found for gameweek ${week.gameweek}`);
    }

    return captain.playerId;
}

export { fancyCalculator }