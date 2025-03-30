declare const reference: unique symbol;
type Reference<T, TReference extends string> = T & { [reference]: TReference };

export type FantasyManagerId = Reference<string, 'FantasyManagerId'>;
export type FantasyLeagueId = Reference<string, 'FantasyLeagueId'>;

export type PremierLeaguePlayerId = Reference<string, 'PremierLeaguePlayerId'>;
export type PremierLeagueTeamId = Reference<string, 'PremierLeagueTeamId'>;
export type EventId = Reference<number, 'EventId'>;

export type OffsetDateTime =
    `${number}-${number}-${number}T${number}:${number}${`:${number}` | ''}${'Z' | `${'+' | '-'}${number}${`:${number}` | ''}`}`;
