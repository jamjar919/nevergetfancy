import React from 'react';
import styles from '../FancyTable.module.scss';
import { GraphQLPlayerCard } from '../../../../framework/player/GraphQLPlayerCard';
import { PremierLeaguePlayerId } from '../../../../../../graphql/Reference';
import { PointDisplay } from '../../../../framework/point-display/PointDisplay';

type FancyTableLineProps = {
    gameweek: number;
    captainId: PremierLeaguePlayerId;
    wasViceCaptain: boolean;
    captainGameSummary?: {
        points: number;
    };
    comparisonPlayerId: PremierLeaguePlayerId;
    comparisonGameSummary?: {
        points: number;
    };
    pointDifference: number;
}

const FancyTableLine: React.FC<FancyTableLineProps> = (props) => {

    const {
        captainId,
        wasViceCaptain,
        captainGameSummary,
        comparisonPlayerId,
        comparisonGameSummary,
        pointDifference,
        gameweek
    } = props;

    return (
        <tr>
            <td>GW {gameweek}</td>
            <td>•</td>
            <td className={styles.points}>
                {captainGameSummary && captainGameSummary.points}
            </td>
            <td>
                <GraphQLPlayerCard playerId={captainId as PremierLeaguePlayerId} />
                {wasViceCaptain && <span className={styles.viceCaptain}> (VC)</span>}
            </td>
            <td className={styles.points}>
                {comparisonGameSummary && comparisonGameSummary.points}
            </td>
            <td>
                <GraphQLPlayerCard playerId={comparisonPlayerId} />
            </td>
            <td>
                <PointDisplay points={pointDifference} />
            </td>
        </tr>
    );
}

export { FancyTableLine }
export type { FancyTableLineProps }