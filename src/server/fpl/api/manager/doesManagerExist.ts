import {fetchFromApi} from "../../../util/fetchFromApi";
import {FantasyPremierLeagueApi} from "../apiConfig";
import {FantasyManagerId} from "../../../../graphql/Reference";

const doesManagerExist = async (managerId: FantasyManagerId): Promise<boolean> => {
    const response = await fetchFromApi(FantasyPremierLeagueApi.Manager(managerId));
    return response.ok;
}

export { doesManagerExist }