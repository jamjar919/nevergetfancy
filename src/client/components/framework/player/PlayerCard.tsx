import React from 'react';

import {
    PlayerCardFragment,
    PremierLeaguePlayerPosition,
} from '../../../../graphql/generated/Client';
import { formatShortPlayerPosition } from '../../../util/FormatShortPlayerPosition';
import CaptainIcon from '../icon/CaptainIcon';
import ViceCaptainIcon from '../icon/ViceCaptainIcon';

import styles from './PlayerCard.module.scss';

export enum CaptainStatus {
    NONE = 'NONE',
    CAPTAIN = 'CAPTAIN',
    VICE_CAPTAIN = 'VICE_CAPTAIN',
}

type PlayerProps = {
    player: PlayerCardFragment;
    captainStatus?: CaptainStatus;
};

const PlayerCard: React.FC<PlayerProps> = ({ player, captainStatus = CaptainStatus.NONE }) => {
    const {
        displayName,
        team: {
            shortName: teamShortName,
            shirts: { homeImageSrc, goalkeeperImageSrc },
        },
        position,
    } = player;

    const renderCaptainIcon = () => {
        switch (captainStatus) {
            case CaptainStatus.CAPTAIN:
                return <CaptainIcon size={16} className={styles.captainIcon} />;
            case CaptainStatus.VICE_CAPTAIN:
                return <ViceCaptainIcon size={16} className={styles.captainIcon} />;
            default:
                return null;
        }
    };

    const getPlayerImageSrc = () => {
        if (position === PremierLeaguePlayerPosition.Goalkeeper) {
            return goalkeeperImageSrc;
        }
        return homeImageSrc;
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src={getPlayerImageSrc()}
                    alt={`Player shirt for ${displayName} who plays for ${teamShortName}`}
                />
            </div>
            <div className={styles.playerDetails}>
                <div className={styles.playerName}>
                    {displayName}
                    {renderCaptainIcon()}
                </div>
                <div className={styles.playerDetailsSecondary}>
                    <div>{teamShortName}</div>
                    <div>{formatShortPlayerPosition(position)}</div>
                </div>
            </div>
        </div>
    );
};

export { PlayerCard };
