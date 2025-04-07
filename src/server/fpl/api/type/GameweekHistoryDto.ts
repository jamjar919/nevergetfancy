import { EventId } from '../../../../graphql/Reference';
import { GameweekPickDto } from './GameweekPickDto';
import { GameweekSubDto } from './GameweekSubDto';

type GameweekHistoryDto = {
    gameweek: EventId;
    points: number;
    totalPoints: number;
    subs: GameweekSubDto[];
    picks: GameweekPickDto[];
};

export { GameweekHistoryDto };
