import React from 'react';

import { CaptainStatus } from '../../../../framework/player/PlayerCard';
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
                    <div className={styles.playerInfo}>
                        <GraphQLPlayerCard 
                            playerId={captainId} 
                            captainStatus={wasViceCaptain ? CaptainStatus.VICE_CAPTAIN : CaptainStatus.CAPTAIN} 
                        />
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