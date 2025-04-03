'use client';

import React from 'react';

import { FantasyManagerId } from '../../../../graphql/Reference';
import { FancyComparisonType, useFancyQuery } from '../../../../graphql/generated/Client';
import { Header } from '../../framework/header/Header';
import { FullPageLoader } from '../../framework/loader/full-page/FullPageLoader';
import { FancyLinks } from './links/FancyLinks';
import { FancySummary } from './summary/FancySummary';
import { FancyTable } from './table/FancyTable';
import { TotalPointDifference } from './total-point-difference/TotalPointDifference';

import styles from './FancyResult.module.scss';

type FancyResultProps = {
    teamId: FantasyManagerId;
};

const FancyResult: React.FC<FancyResultProps> = ({ teamId }) => {
    const { data, error } = useFancyQuery({
        variables: {
            fantasyTeamId: teamId,
            comparison: FancyComparisonType.Salah,
        },
    });

    if (!data) {
        return <FullPageLoader />;
    }

    if (error) {
        return 'error loading page';
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
                <FancyTable captainScores={captainScores} comparisonScores={comparisonScores} />
            </div>
            <div className={styles.linksContainer}>
                <FancyLinks teamId={teamId} currentEvent={currentEvent} />
            </div>
        </div>
    );
};

export { FancyResult };
