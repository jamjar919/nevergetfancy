import React from "react";

import styles from "./TotalPointDifference.module.scss"
import classNames from "classnames";

type TotalPointDifferenceProps = {
    points: number;
}

const TotalPointDifference: React.FC<TotalPointDifferenceProps> = ({ points }) => {
    const pointDifferenceClassnames = classNames({
        [styles.positive]: points > 0,
        [styles.negative]: points < 0,
        [styles.neutral]: points === 0
    }, styles.result);

    return <div className={pointDifferenceClassnames}>{points}</div>;
}

export { TotalPointDifference }