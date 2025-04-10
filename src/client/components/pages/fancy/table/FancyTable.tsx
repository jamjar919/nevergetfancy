import React from 'react';

import { PremierLeaguePlayerId } from '../../../../../graphql/Reference';
import {
    FancyPickLineAttributesFragment,
    FancyResultLineAttributesFragment,
} from '../../../../../graphql/generated/Client';
import { useDisplaySize } from '../../../../components/framework/context/DisplaySizeContext';
import { FancyTableCard } from './card/FancyTableCard';
import { FancyTableLine, FancyTableLineProps } from './line/FancyTableLine';

import styles from './FancyTable.module.scss';

type FancyTableProps = {
    captainScores: FancyPickLineAttributesFragment[];
    comparisonScores: FancyResultLineAttributesFragment[];
};

const FancyTable: React.FC<FancyTableProps> = (props) => {
    const { isMobile } = useDisplaySize();

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
    );

    // Mobile view with cards
    if (isMobile) {
        return (
            <div className={styles.cardsContainer}>
                {lines.map((line) => (
                    <FancyTableCard key={line.gameweek} {...line} />
                ))}
            </div>
        );
    }

    // Desktop view with table
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>GW</th>
                    <th />
                    <th>Pts</th>
                    <th>Captain</th>
                    <th>Pts</th>
                    <th>Comparison</th>
                    <th>Diff</th>
                </tr>
            </thead>
            <tbody>
                {lines.map((line) => (
                    <FancyTableLine key={line.gameweek} {...line} />
                ))}
            </tbody>
        </table>
    );
};

export { FancyTable };
