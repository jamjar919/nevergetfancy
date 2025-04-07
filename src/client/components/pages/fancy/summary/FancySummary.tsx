import React from 'react';

import { FantasyManagerId } from '../../../../../graphql/Reference';
import { FancyComparisonType } from '../../../../../graphql/generated/Client';
import { InlineSelectInput } from '../../../framework/select-input/InlineSelectInput';
import { useFancyContext } from '../context/FancyContext';
import { FancyShare } from '../share/FancyShare';
import { getSummaryOfPerformance } from './GetSummaryOfPerformance';

import styles from './FancySummary.module.scss';

type FancySummaryProps = {
    teamId: FantasyManagerId;
    points: number;
    timesCouldHaveGotFancy: number;
    timesGotFancy: number;
    worstGameweekScore: number;
    worstGameweek: number;
};

const FancySummary: React.FC<FancySummaryProps> = ({
    teamId,
    points,
    timesGotFancy,
    timesCouldHaveGotFancy,
    worstGameweekScore,
    worstGameweek,
}) => {
    const { comparisonType, setComparisonType } = useFancyContext();

    const quote = getSummaryOfPerformance(points);

    const switchFancyComparisonSelect = (
        <InlineSelectInput
            value={comparisonType}
            options={[
                {
                    value: FancyComparisonType.Salah,
                    label: 'Salah',
                },
                {
                    value: FancyComparisonType.Haaland,
                    label: 'Haaland',
                },
                {
                    value: FancyComparisonType.BestPlayerInTeam,
                    label: 'the best player in your team',
                },
                {
                    value: FancyComparisonType.BestPlayerOverall,
                    label: 'the best player in FPL',
                },
            ]}
            onChange={(e) => {
                const selectedValue = e.target.value as FancyComparisonType;
                setComparisonType(selectedValue);
            }}
            className={styles.select}
        ></InlineSelectInput>
    );

    const comparisonName = (() => {
        switch (comparisonType) {
            case FancyComparisonType.Salah:
                return 'Salah';
            case FancyComparisonType.Haaland:
                return 'Haaland';
            case FancyComparisonType.BestPlayerInTeam:
                return 'the best player in your team';
            case FancyComparisonType.BestPlayerOverall:
                return 'the best player in FPL';
        }
    })();

    return (
        <div className={styles.container}>
            <div className={styles.quote}>{quote}</div>
            <div className={styles.fancyFacts}>
                <div>
                    You got fancy <strong>{timesGotFancy}</strong> times out of{' '}
                    {timesCouldHaveGotFancy}.
                </div>
                {worstGameweekScore < 0 ? (
                    <div>
                        Your worst gameweek was <strong>GW {worstGameweek}</strong> where you lost
                        out on <strong>{Math.abs(worstGameweekScore)} points.</strong>
                    </div>
                ) : (
                    <div>You beat {comparisonName} every week (or picked them every week!)</div>
                )}
                <div>
                    Want to know how your Mini League rival did? See your leagues{' '}
                    <a href={`/team/${teamId}/leagues/`}>here</a>.
                </div>
                <div className={styles.comparisonSelect}>
                    The table below shows your performance for each gameweek compared to{' '}
                    {switchFancyComparisonSelect}
                </div>
            </div>
            <div className={styles.share}>
                <FancyShare points={points} comparisonType={comparisonType} />
            </div>
        </div>
    );
};

export { FancySummary };
