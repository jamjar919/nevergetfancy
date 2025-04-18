'use client';

import React from 'react';

import { FantasyManagerId } from '../../../../graphql/Reference';
import { FancyComparisonType, useFancyQuery } from '../../../../graphql/generated/Client';
import { Header } from '../../framework/header/Header';
import { FullPageError } from '../../framework/loader/full-page/FullPageError';
import { FullPageLoader } from '../../framework/loader/full-page/FullPageLoader';
import { useFancyContext } from './context/FancyContext';
import { FancyLinks } from './links/FancyLinks';
import { FancySummary } from './summary/FancySummary';
import { FancyTable } from './table/FancyTable';
import { TotalPointDifference } from './total-point-difference/TotalPointDifference';

import styles from './FancyResult.module.scss';

type FancyResultProps = {
    teamId: FantasyManagerId;
};

const FancyResult: React.FC<FancyResultProps> = ({ teamId }) => {
    const { comparisonType } = useFancyContext();

    const { data, error } = useFancyQuery({
        variables: {
            fantasyTeamId: teamId,
            comparison: comparisonType,
        },
    });

    if (error) {
        return (
            <FullPageError message="Something went wrong and we couldn't load your fantasy team." />
        );
    }

    if (!data) {
        return <FullPageLoader />;
    }

    const {
        fantasyTeam: {
            name,
            manager: { name: managerName },
            currentEvent,
        },
        fancy: {
            captainScores,
            comparison: {
                totalPointDifference,
                timesGotFancy,
                worstGameweek: { gameweek: worstGameweek, pointDifference: worstGameweekScore },
                comparisonScores,
            },
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
                    timesCouldHaveGotFancy={comparisonScores.length}
                    worstGameweekScore={worstGameweekScore}
                    worstGameweek={worstGameweek}
                />
            </div>
            <div className={styles.tableContainer}>
                <FancyTable
                    captainScores={captainScores}
                    comparisonScores={comparisonScores}
                    teamId={teamId}
                />
            </div>
            <div className={styles.info}>
                The captaincy points and comparison points are the points scored by the player each
                week, and are not doubled.
            </div>
            <div className={styles.linksContainer}>
                <FancyLinks teamId={teamId} currentEvent={currentEvent} />
            </div>
        </div>
    );
};

export { FancyResult };
