'use client';

import React from "react";

import {useFancyQuery} from "../../../../graphql/generated/Client";
import {FantasyManagerId} from "../../../../graphql/Reference";
import {FancyTable} from "./table/FancyTable";
import {TotalPointDifference} from "./total-point-difference/TotalPointDifference";
import {FancySummary} from "./summary/FancySummary";
import {Header} from "../../framework/header/Header";

import styles from './FancyResult.module.scss';
import {FancyLinks} from "./links/FancyLinks";
import {FootballSpinnerLoader} from "../../framework/loader/football-spinner/FootballSpinnerLoader";

type FancyResultProps = {
    teamId: FantasyManagerId
}

const FancyResult: React.FC<FancyResultProps> = ({ teamId }) => {
    const {
        data
    } = useFancyQuery({
        variables: {
            fantasyTeamId: teamId
        }
    });

    if (!data) {
        return (
            <FootballSpinnerLoader />
        )
    }

    const {
        fancy: {
            totalPointDifference,
            worstGameweekScore,
            worstGameweek,
            timesGotFancy,
            lines
        },
        fantasyTeam: {
            name,
            manager: {
                name: managerName
            },
            currentEvent
        }
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
    )
};

export { FancyResult }