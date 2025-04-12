import { EventId, PremierLeaguePlayerId } from '../../../../graphql/Reference';
import { fetchFromApi } from '../../../util/fetchFromApi';
import { FantasyPremierLeagueApi } from '../apiConfig';
import {
    PlayerGamePerformanceDto,
    playerPerformanceDtoFromApi,
} from '../type/PlayerGamePerformanceDto';
import { EventLiveApiResponse } from './EventLiveApiResponse';

const getEventPerformance = async (gameweek: EventId): Promise<PlayerGamePerformanceDto[]> => {
    const response = await fetchFromApi(FantasyPremierLeagueApi.LiveEvent(gameweek)).then(
        (res) => res.json() as Promise<EventLiveApiResponse>
    );

    if (!response || !response.elements) {
        throw new Error(`Error fetching event performance for gameweek ${gameweek}`);
    }

    return response.elements.map((element) =>
        playerPerformanceDtoFromApi(element.stats, String(element.id) as PremierLeaguePlayerId)
    );
};

export { getEventPerformance };
