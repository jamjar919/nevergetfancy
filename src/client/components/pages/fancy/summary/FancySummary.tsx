import React from "react";
import {getSummaryOfPerformance} from "./GetSummaryOfPerformance";
import {FancyShare} from "../share/FancyShare";
import {FantasyManagerId} from "../../../../../graphql/Reference";

import styles from "./FancySummary.module.scss";

type FancySummaryProps = {
    teamId: FantasyManagerId;
    points: number;
    timesCouldHaveGotFancy: number;
    timesGotFancy: number;
    worstGameweekScore: number;
    worstGameweek: number;
}

const FancySummary: React.FC<FancySummaryProps> = ({ teamId, points, timesGotFancy, timesCouldHaveGotFancy, worstGameweekScore, worstGameweek }) => {
    const quote = getSummaryOfPerformance(points);

    return (
        <div className={styles.container}>
            <div className={styles.quote}>{quote}</div>
            <div className={styles.fancyFacts}>
                <div>You got fancy <strong>{timesGotFancy}</strong> times out of {timesCouldHaveGotFancy}.</div>
                {worstGameweekScore < 0
                    ? <div>Your worst gameweek was <strong>GW {worstGameweek}</strong> where you lost out on <strong>{Math.abs(worstGameweekScore)} points.</strong></div>
                    : <div>You beat Salah every week (or picked him every week!)</div>
                }
                <div>Want to know how your Mini League rival did? See your leagues <a href={`/team/${teamId}/leagues/`}>here</a>.</div>
                <div>The table below shows your performance for each gameweek compared to Salah.</div>
            </div>
            <div className={styles.share}>
                <FancyShare points={points} />
            </div>
        </div>
    )
}

export { FancySummary }