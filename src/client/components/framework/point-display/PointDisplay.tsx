import React from 'react';

import { RankChangeEnum, RankChangeIcon } from './rank/RankChangeIcon';

import styles from './PointDisplay.module.scss';

type PointDisplayProps = {
    points: number;
};

const getRankChange = (points: number): RankChangeEnum => {
    if (points > 0) {
        return RankChangeEnum.UP;
    } else if (points < 0) {
        return RankChangeEnum.DOWN;
    } else {
        return RankChangeEnum.SAME;
    }
};

const PointDisplay: React.FC<PointDisplayProps> = ({ points }) => {
    return (
        <div className={styles.pointDisplay}>
            <div className={styles.points}>{points}</div>
            <div className={styles.icon}>
                <RankChangeIcon change={getRankChange(points)} size={'lg'} />
            </div>
        </div>
    );
};

export { PointDisplay };
