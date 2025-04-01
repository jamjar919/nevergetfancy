import { GameweekHistoryDto } from '../../api/type/GameweekHistoryDto';
import { CaptainDto } from './type/CaptainDto';
import { GameweekSubDto } from '../../api/type/GameweekSubDto';
import { GameweekPickDto } from '../../api/type/GameweekPickDto';

const getCaptainForGameweek = (week: GameweekHistoryDto): CaptainDto => {
    const captain = week.picks.find((pick: GameweekPickDto) => pick.captain);
    const wasCaptainSubbed = week.subs.some((sub: GameweekSubDto) => sub.playerOut === captain?.playerId);
    
    // If the captain was subbed, the vice captain becomes the captain
    if (wasCaptainSubbed) {
        const viceCaptain = week.picks.find((pick) => pick.viceCaptain);

        if (!viceCaptain) {
            throw new Error(`Captain was subbed and no vice captain found for gameweek ${week.gameweek}`);
        }

        return {
            captainId: viceCaptain.playerId,
            wasOriginallyViceCaptain: true
        };
    }

    if (!captain) {
        throw new Error(`No captain found for gameweek ${week.gameweek}`);
    }

    return {
        captainId: captain.playerId,
        wasOriginallyViceCaptain: false
    };
};

export { getCaptainForGameweek }