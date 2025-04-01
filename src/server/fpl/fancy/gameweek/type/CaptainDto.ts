import { PremierLeaguePlayerId } from '../../../../../graphql/Reference';

type CaptainDto = {
    captainId: PremierLeaguePlayerId;
    wasOriginallyViceCaptain: boolean
}

export { CaptainDto }