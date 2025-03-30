import { EventId } from '../../../../graphql/Reference';
import { GameweekPickDto } from './GameweekPickDto';

type GameweekHistoryDto = {
    gameweek: EventId;
    points: number;
    totalPoints: number;
    picks: GameweekPickDto[];
};

export { GameweekHistoryDto };
