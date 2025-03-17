'use client';

import React from "react";

import {useFancyQuery} from "../../../graphql/generated/Client";
import {FantasyManagerId} from "../../../graphql/Reference";
import {FancyTable} from "./table/FancyTable";
import {TotalPointDifference} from "./total-point-difference/TotalPointDifference";
import {FancySummary} from "./summary/FancySummary";
import {Header} from "../framework/header/Header";

import styles from './FancyResult.module.scss';

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
        return <div>Loading...</div>
    }

    const {
        fancy: {
            totalPointDifference,
            lines
        },
        fantasyTeam: {
            name,
            manager: {
                name: managerName
            }
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
                <FancySummary points={totalPointDifference} />
            </div>
            <div className={styles.tableContainer}>
                <FancyTable lines={lines} />
            </div>
        </div>
    )
};

export { FancyResult }