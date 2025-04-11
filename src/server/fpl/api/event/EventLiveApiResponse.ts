import { PlayerStats } from '../type/response-types/CommonTypes';

export type EventLiveApiResponse = {
    elements: EventLiveElement[];
};

export type EventLiveElement = {
    id: number; // PremierLeaguePlayerId
    stats: PlayerStats;
    explain: EventExplainElement[];
};

export type EventExplainElement = {
    fixture: number;
    stats: EventExplainStat[];
};

export type EventExplainStat = {
    identifier: string;
    points: number;
    value: number;
};
