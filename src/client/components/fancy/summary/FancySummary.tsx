import React from "react";
import {getSummaryOfPerformance} from "./GetSummaryOfPerformance";

import styles from "./FancySummary.module.scss";
import {FancyShare} from "../share/FancyShare";

type FancySummaryProps = {
    points: number;
}

const FancySummary: React.FC<FancySummaryProps> = ({ points }) => {
    const quote = getSummaryOfPerformance(points);

    return (
        <div className={styles.container}>
            <div>{quote}</div>
            <div className={styles.share}>
                <FancyShare points={points} />
            </div>
        </div>
    )
}

export { FancySummary }