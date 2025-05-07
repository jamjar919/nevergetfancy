import { fetchFromApi } from '../../../util/fetchFromApi';
import { FantasyPremierLeagueApi } from '../apiConfig';
import { BootstrapApiResponse } from '../bootstrap/BootstrapApiResponse';
import { EventId } from '../../../../graphql/Reference';

const getCurrentEvent = async (): Promise<EventId> => {
    const response = await fetchFromApi(FantasyPremierLeagueApi.Bootstrap());
    const data: BootstrapApiResponse = await response.json();

    return data.events.find((event) => event.is_current)?.id as EventId;
}

export { getCurrentEvent };