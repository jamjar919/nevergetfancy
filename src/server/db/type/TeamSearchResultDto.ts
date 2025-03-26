import {FantasyManagerId} from "../../../graphql/Reference";

type TeamSearchResultDto = {
    id: FantasyManagerId,
    teamName: string,
    managerName: string
}

export { TeamSearchResultDto }