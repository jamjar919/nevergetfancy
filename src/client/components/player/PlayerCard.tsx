import React from "react";
import {PlayerCardFragment} from "../../../graphql/generated/Client";

import styles from './PlayerCard.module.scss';
import {formatShortPlayerPosition} from "../../util/FormatShortPlayerPosition";

type PlayerProps = {
    player: PlayerCardFragment;
}

const PlayerCard: React.FC<PlayerProps> = ({ player }) => {
    const {
        displayName,
        team: {
            shortName: teamShortName,
            shirts: {
                homeImageSrc
            }
        },
        position
    } = player;

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={homeImageSrc} alt={`Player shirt for ${displayName} who plays for ${teamShortName}`} />
            </div>
            <div className={styles.playerDetails}>
                <div className={styles.playerName}>{displayName}</div>
                <div className={styles.playerDetailsSecondary}>
                    <div>{teamShortName}</div>
                    <div>{formatShortPlayerPosition(position)}</div>
                </div>
            </div>
        </div>
    )
}

export { PlayerCard }