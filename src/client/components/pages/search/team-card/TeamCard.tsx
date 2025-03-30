import React from 'react';

import styles from './TeamCard.module.scss';

type TeamCardProps = {
    teamId: string;
    teamName: string;
    managerName: string;
};

const TeamCard: React.FC<TeamCardProps> = ({ teamName, managerName, teamId }) => {
    const href = `/team/${teamId}`;

    return (
        <a href={href} className={styles.card}>
            <div className={styles.teamName}>{teamName}</div>
            <div className={styles.managerName}>{managerName}</div>
        </a>
    );
};

export { TeamCard };
