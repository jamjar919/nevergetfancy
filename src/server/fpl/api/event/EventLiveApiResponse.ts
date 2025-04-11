import { PremierLeaguePlayerId } from '../../../../graphql/Reference';
import { PlayerStats } from '../type/response-types/CommonTypes';

export interface EventLiveApiResponse {
    elements: EventLiveElement[];
}

export interface EventLiveElement {
    id: PremierLeaguePlayerId;
    stats: PlayerStats;
    explain: EventExplainElement[];
}

export interface EventExplainElement {
    fixture: number;
    stats: EventExplainStat[];
}

export interface EventExplainStat {
    identifier: string;
    points: number;
    value: number;
}