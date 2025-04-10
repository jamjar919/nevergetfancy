import React from 'react';

import { GraphQLPlayerCard } from '../../../../framework/player/GraphQLPlayerCard';
import { PointDisplay } from '../../../../framework/point-display/PointDisplay';
import { FancyTableLineProps } from '../line/FancyTableLine';

import styles from './FancyTableCard.module.scss';

type FancyTableCardProps = FancyTableLineProps;

const FancyTableCard: React.FC<FancyTableCardProps> = ({
    gameweek,
    captainId,
    wasViceCaptain,
    captainGameSummary,
    comparisonPlayerId,
    comparisonGameSummary,
    pointDifference,
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.gameweek}>
                    <span className={styles.calendarIcon}>🗓</span> GW {gameweek}
                </div>
                <div className={styles.difference}>
                    <PointDisplay points={pointDifference} />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.playerRow}>
                    <div className={styles.playerLabel}>
                        {wasViceCaptain && <span className={styles.viceCaptain}> (VC)</span>}
                    </div>
                    <div className={styles.playerInfo}>
                        <GraphQLPlayerCard playerId={captainId} />
                        <div className={styles.points}>
                            {captainGameSummary ? `${captainGameSummary.points} pts` : '-'}
                        </div>
                    </div>
                </div>
                <div className={styles.playerRow}>
                    <div className={styles.playerInfo}>
                        <GraphQLPlayerCard playerId={comparisonPlayerId} />
                        <div className={styles.points}>
                            {comparisonGameSummary ? `${comparisonGameSummary.points} pts` : '-'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { FancyTableCard };