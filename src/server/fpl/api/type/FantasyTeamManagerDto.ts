import {EventId, FantasyManagerId, OffsetDateTime, PremierLeagueTeamId} from "../../../../graphql/Reference";
import {FantasyTeamManagerLeagueDto} from "./FantasyTeamManagerLeagueDto";

type FantasyTeamManagerDto = {
    id: FantasyManagerId;
    joinedTime: OffsetDateTime;

    teamName: string;
    favouriteTeam: PremierLeagueTeamId;

    // Name
    playerFirstName: string;
    playerLastName: string;

    // region
    playerRegion: FantasyTeamManagerRegionDto;

    // What week they started at
    startedEvent: EventId;

    // The current week they are playing
    currentEvent: EventId;

    // Total number of points
    summaryOverallPoints: number;

    // Rank
    summaryOverallRank: number;

    // Total number of points for the current week
    summaryEventPoints: number;

    // Rank for the current week
    summaryEventRank: number;

    // Amount of money in the bank *10
    lastDeadlineBank: number;

    // Total team value *10
    lastDeadlineValue: number;

    // Amount of total transfers they've made
    lastDeadlineTotalTransfers: number;

    leagues: FantasyTeamManagerLeagueDto[];
}

type FantasyTeamManagerRegionDto = {
    regionId: number;
    regionName: string;
    isoCodeShort: string;
    isoCodeLong: string;
}

export { FantasyTeamManagerDto }
