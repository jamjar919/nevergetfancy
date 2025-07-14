import React, { useState } from 'react';

import { PremierLeaguePlayerId } from '../../../../../graphql/Reference';
import {
    FancyPickLineAttributesFragment,
    FancyResultLineAttributesFragment,
} from '../../../../../graphql/generated/Client';
import { useDisplaySize } from '../../../../components/framework/context/DisplaySizeContext';
import { Ad } from '../../../framework/ad/Ad';
import { FancyTableCard } from './card/FancyTableCard';
import { FancyTableLine, FancyTableLineProps } from './line/FancyTableLine';

import styles from './FancyTable.module.scss';

type FancyTableProps = {
    captainScores: FancyPickLineAttributesFragment[];
    comparisonScores: FancyResultLineAttributesFragment[];
    teamId?: string;
};

const INITIAL_VISIBLE_GAMEWEEKS = 15;

const FancyTable: React.FC<FancyTableProps> = (props) => {
    const { isMobile } = useDisplaySize();
    const [visibleGameweeks, setVisibleGameweeks] = useState<number>(INITIAL_VISIBLE_GAMEWEEKS);
    const { captainScores, comparisonScores, teamId } = props;

    const lines: FancyTableLineProps[] = Array.from({ length: captainScores.length }, (_, i) => {
        const captainScore = captainScores[i];
        const comparisonScore = comparisonScores[i];

        return {
            gameweek: captainScore.gameweek,
            captainId: captainScore.captainId as PremierLeaguePlayerId,
            wasViceCaptain: captainScore.wasOriginallyViceCaptain,
            captainGameSummary: captainScore.captainGameSummary,
            comparisonPlayerId: comparisonScore.playerId as PremierLeaguePlayerId,
            comparisonGameSummary: comparisonScore.comparisonGameSummary,
            pointDifference: comparisonScore.pointDifference,
        };
    });

    const handleShowMore = () => {
        setVisibleGameweeks(lines.length);
    };

    // Mobile view with cards
    if (isMobile) {
        const visibleLines = lines.slice(0, visibleGameweeks);
        const hasMoreToShow = visibleGameweeks < lines.length;

        return (
            <div className={styles.cardsContainer}>
                {visibleLines.map((line) => {
                    return (
                        <div key={line.gameweek}>
                            <FancyTableCard teamId={teamId} {...line} />
                        </div>
                    );
                })}
                {hasMoreToShow && (
                    <div className={styles.showMoreContainer}>
                        <button className={styles.showMoreButton} onClick={handleShowMore}>
                            Show all gameweeks ({lines.length - visibleGameweeks} remaining)
                        </button>
                    </div>
                )}
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
                    <th />
                    <th>Pts</th>
                    <th>Comparison</th>
                    <th>Diff</th>
                </tr>
            </thead>
            <tbody>
                {lines.map((line) => (
                    <FancyTableLine key={line.gameweek} teamId={teamId} {...line} />
                ))}
            </tbody>
        </table>
    );
};

export { FancyTable };
