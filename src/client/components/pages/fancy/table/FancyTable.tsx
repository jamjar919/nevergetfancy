import React from 'react';

import {
    FancyPickLineAttributesFragment,
    FancyResultLineAttributesFragment,
} from '../../../../../graphql/generated/Client';

import styles from './FancyTable.module.scss';
import { FancyTableLine, FancyTableLineProps } from './line/FancyTableLine';
import { PremierLeaguePlayerId } from '../../../../../graphql/Reference';

type FancyTableProps = {
    captainScores: FancyPickLineAttributesFragment[];
    comparisonScores: FancyResultLineAttributesFragment[];
};

const FancyTable: React.FC<FancyTableProps> = (props) => {
    const lines: FancyTableLineProps[] = Array.from(
        { length: props.captainScores.length },
        (_, i) => {
            const captainScore = props.captainScores[i];
            const comparisonScore = props.comparisonScores[i];

            return {
                gameweek: captainScore.gameweek,
                captainId: captainScore.captainId as PremierLeaguePlayerId,
                wasViceCaptain: captainScore.wasOriginallyViceCaptain,
                captainGameSummary: captainScore.captainGameSummary,
                comparisonPlayerId: comparisonScore.playerId as PremierLeaguePlayerId,
                comparisonGameSummary: comparisonScore.comparisonGameSummary,
                pointDifference: comparisonScore.pointDifference,
            };
        }
    )

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>GW</th>
                    <th />
                    <th>Pts</th>
                    <th>Captain</th>
                    <th>Pts</th>
                    <th>Salah</th>
                    <th>Diff</th>
                </tr>
            </thead>
            <tbody>
                {lines.map((line) => <FancyTableLine key={line.gameweek} {...line} />)}
            </tbody>
        </table>
    );
};

export { FancyTable };
