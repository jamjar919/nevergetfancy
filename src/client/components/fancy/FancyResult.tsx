'use client';

import React from "react";

import {useFancyQuery} from "../../../graphql/generated/Client";
import {FantasyManagerId} from "../../../graphql/Reference";
import classNames from "classnames";

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
        return <div className={styles.loading}>Loading...</div>
    }

    const {
        fancy: {
            totalPointDifference,
            lines
        }
    } = data;

    const pointDifferenceClassnames = classNames({
        [styles.result]: true,
        [styles.positive]: totalPointDifference > 0,
        [styles.negative]: totalPointDifference < 0
    });

    return (
        <div>
            <div className={pointDifferenceClassnames}>{totalPointDifference}</div>
            <>
                {lines.map((line) => (
                    <div key={line.gameweek}>
                        <div>GW {line.gameweek}</div>
                        <div>{line.gotFancy ? 'Got fancy' : 'No fancy'}</div>
                        <div>Captain: {line.captain.displayName}</div>
                        <div>Point difference: {line.pointDifference}</div>
                        <hr/>
                    </div>
                ))}
            </>
        </div>
    )
};

export { FancyResult }