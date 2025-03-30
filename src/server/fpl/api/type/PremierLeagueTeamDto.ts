import { PremierLeagueTeamId } from '../../../../graphql/Reference';

type PremierLeagueTeamDto = {
    id: PremierLeagueTeamId;
    name: string;
    played: number;
    position: number;
    shortName: string;
};

export { PremierLeagueTeamDto };
