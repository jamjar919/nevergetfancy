'use client';

import React from 'react';

import { FantasyManagerId } from '../../../../graphql/Reference';
import { useFancyQuery } from '../../../../graphql/generated/Client';
import { Header } from '../../framework/header/Header';
import { FootballSpinnerLoader } from '../../framework/loader/football-spinner/FootballSpinnerLoader';
import { FancyLinks } from './links/FancyLinks';
import { FancySummary } from './summary/FancySummary';
import { FancyTable } from './table/FancyTable';
import { TotalPointDifference } from './total-point-difference/TotalPointDifference';

import styles from './FancyResult.module.scss';

type FancyResultProps = {
    teamId: FantasyManagerId;
};

const FancyResult: React.FC<FancyResultProps> = ({ teamId }) => {
    const { data } = useFancyQuery({
        variables: {
            fantasyTeamId: teamId,
        },
    });

    if (!data) {
        return <FootballSpinnerLoader />;
    }

    const {
        fancy: { totalPointDifference, worstGameweekScore, worstGameweek, timesGotFancy, lines },
        fantasyTeam: {
            name,
            manager: { name: managerName },
            currentEvent,
        },
    } = data;

    return (
        <div>
            <header>
                <Header title={name} subtitle={managerName && `Managed by ${managerName}`} />
            </header>
            <div className={styles.totalPointDifferenceContainer}>
                <TotalPointDifference points={totalPointDifference} />
            </div>
            <div className={styles.summaryContainer}>
                <FancySummary
                    teamId={teamId}
                    points={totalPointDifference}
                    timesGotFancy={timesGotFancy}
                    timesCouldHaveGotFancy={lines.length}
                    worstGameweekScore={worstGameweekScore}
                    worstGameweek={worstGameweek}
                />
            </div>
            <div className={styles.tableContainer}>
                <FancyTable lines={lines} />
            </div>
            <div className={styles.linksContainer}>
                <FancyLinks teamId={teamId} currentEvent={currentEvent} />
            </div>
        </div>
    );
};

export { FancyResult };
