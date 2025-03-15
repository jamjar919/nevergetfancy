import {PremierLeaguePlayerPosition} from "../../graphql/generated/Client";

const formatShortPlayerPosition = (position: PremierLeaguePlayerPosition): string => {
    switch (position) {
        case PremierLeaguePlayerPosition.Goalkeeper:
            return 'GKP';
        case PremierLeaguePlayerPosition.Defender:
            return 'DEF';
        case PremierLeaguePlayerPosition.Midfielder:
            return 'MID';
        case PremierLeaguePlayerPosition.Forward:
            return 'FWD';
        case PremierLeaguePlayerPosition.Manager:
            return 'MGR';
        default:
            return 'UNK';
    }
}

export { formatShortPlayerPosition }