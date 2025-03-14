declare const reference: unique symbol;
type Reference<T, TReference extends string> = T & { [reference]: TReference };

type FantasyTeamId = Reference<string, 'FantasyTeamId'>;

export { FantasyTeamId };