import {GameweekPickDto} from "./GameweekPickDto";
import {EventId} from "../../../../graphql/Reference";

type GameweekHistoryDto = {
    gameweek: EventId;
    points: number;
    totalPoints: number;
    picks: GameweekPickDto[];
}

export { GameweekHistoryDto };