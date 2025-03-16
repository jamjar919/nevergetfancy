import React from "react";
import {getSummaryOfPerformance} from "./GetSummaryOfPerformance";

type FancySummaryProps = {
    points: number;
}

const FancySummary: React.FC<FancySummaryProps> = ({ points }) => {
    const quote = getSummaryOfPerformance(points);

    return (
        <div>
            {quote}
        </div>
    )
}

export { FancySummary }