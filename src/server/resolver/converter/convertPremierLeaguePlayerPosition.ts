import {PremierLeaguePlayerTypeDto} from "../../fpl/api/type/PremierLeaguePlayerTypeDto";
import {PremierLeaguePlayerPosition} from "../../../graphql/generated/Resolver";

const convertPremierLeaguePlayerPosition = (position: PremierLeaguePlayerTypeDto): PremierLeaguePlayerPosition => {
    return position as unknown as PremierLeaguePlayerPosition;
}

export { convertPremierLeaguePlayerPosition }