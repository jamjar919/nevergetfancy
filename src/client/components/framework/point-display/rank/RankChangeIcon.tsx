import classNames from 'classnames';

import React from 'react';

import styles from './RankChangeIcon.module.scss';

enum RankChangeEnum {
    UP = 'UP',
    DOWN = 'DOWN',
    SAME = 'SAME',
}

type RankChangeIconProps = {
    change: RankChangeEnum;
    size?: 'sm' | 'md' | 'lg';
};

const getIcon = (change: RankChangeEnum) => {
    if (change === RankChangeEnum.SAME) {
        return '';
    }

    let transform = '';
    if (change === RankChangeEnum.UP) {
        transform = 'matrix(1 0 0 -1 0 15)';
    }

    return (
        <svg className={styles.iconText}>
            <path
                fill="currentColor"
                fillRule="nonzero"
                d="M4.5,6.27851588 L5.1004646,5.63925794 C5.43077928,5.2876031 5.70475818,5 5.70967916,5 C5.71460014,5 6.23194007,5.54639596 6.85921456,6.2144865 L8,7.428973 L9.14078544,6.2144865 C9.76831893,5.5467015 10.2856309,5 10.2903208,5 C10.2952427,5 10.5695007,5.28761055 10.8995354,5.63925794 L11.5,6.27851588 L9.75217699,8.13925794 C8.79080084,9.16274432 8.00246399,10 8.000014,10 C7.99756401,10 7.20894716,9.16281884 6.24785101,8.13925794 L4.5,6.27851588 Z"
                transform={transform}
            />
        </svg>
    );
};

/**
 * Display the rank change icon, which is a upwards or downwards arrow indicating the users
 * rank change.
 */
const RankChangeIcon: React.FC<RankChangeIconProps> = ({ change, size = 'md' }) => {
    const classes = classNames(
        {
            [styles.up]: change === RankChangeEnum.UP,
            [styles.down]: change === RankChangeEnum.DOWN,
            [styles.same]: change === RankChangeEnum.SAME,
            [styles.small]: size === 'sm',
            [styles.medium]: size === 'md',
            [styles.large]: size === 'lg',
        },
        styles.icon
    );

    return <div className={classes}>{getIcon(change)}</div>;
};

export { RankChangeIcon, RankChangeEnum };
