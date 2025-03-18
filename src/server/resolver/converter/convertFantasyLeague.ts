import {FantasyLeague} from "../../../graphql/generated/Resolver";
import {FantasyTeamManagerLeagueDto} from "../../fpl/api/type/FantasyTeamManagerLeagueDto";

const convertFantasyLeague = (league: FantasyTeamManagerLeagueDto): FantasyLeague => {
    return {
        id: league.id,
        name: league.name,
    }
}

export { convertFantasyLeague }