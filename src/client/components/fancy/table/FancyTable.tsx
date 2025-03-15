import React from "react";
import {
    FancyResultLineAttributesFragment
} from "../../../../graphql/generated/Client";

import {PointDisplay} from "../../point-display/PointDisplay";
import {GraphQLPlayerCard} from "../../player/GraphQLPlayerCard";
import {PremierLeaguePlayerId} from "../../../../graphql/Reference";
import {SALAH_PLAYER_ID} from "../../../util/FancyMan";

import styles from './FancyTable.module.scss';

type FancyTableProps = {
    lines: FancyResultLineAttributesFragment[]
}

const FancyTable: React.FC<FancyTableProps> = (props) => {
    const { lines } = props;

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>GW</th>
                    <th />
                    <th>Pts</th>
                    <th>Captain</th>
                    <th>Pts</th>
                    <th>Salah</th>
                    <th>Diff</th>
                </tr>
            </thead>
            <tbody>
                {lines.map((line) => (
                    <tr key={line.gameweek}>
                        <td>GW {line.gameweek}</td>
                        <td>•</td>
                        <td className={styles.points}>{line.captainGameSummary && line.captainGameSummary.points}</td>
                        <td><GraphQLPlayerCard playerId={line.captainId as PremierLeaguePlayerId} /></td>
                        <td className={styles.points}>{line.salahGameSummary && line.salahGameSummary.points}</td>
                        <td><GraphQLPlayerCard playerId={SALAH_PLAYER_ID} /></td>
                        <td>
                            <PointDisplay points={line.pointDifference} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export { FancyTable }