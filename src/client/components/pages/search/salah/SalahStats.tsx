"use client";

import React from "react";
import {useSalahStatsQuery} from "../../../../../graphql/generated/Client";
import {Ticker} from "../../../framework/ticker/Ticker";
import {FootballSpinnerLoader} from "../../../framework/loader/football-spinner/FootballSpinnerLoader";

import styles from "./SalahStats.module.scss";

const SalahStats: React.FC = () => {
    const {data} = useSalahStatsQuery();

    const getContent = () => {
        if (!data?.premierLeaguePlayer) {
            return (
                <FootballSpinnerLoader />
            );
        }

        const {
            premierLeaguePlayer: {
                totalPoints,
                goals,
                assists
            }
        } = data;

        return (
            <div className={styles.stats}>
                <div className={styles.totalPoints}>
                    <Ticker from={0} to={totalPoints} time={2000} />
                </div>
                <div className={styles.generalStats}>
                    <div>
                        <span className={styles.emoji}>⚽</span> <Ticker from={0} to={goals} time={2000} />
                    </div>
                    <div>
                        <span className={styles.emoji}>🤝🏻</span> <Ticker from={0} to={assists} time={2000} />
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className={styles.salah}>
            <div className={styles.salahStats}>
                <img src={"/images/salah-head.png"} alt={"Mo Salah with a crown on his head"} className={styles.image}/>
                <div className={styles.statsBg}>
                    {getContent()}
                </div>
            </div>
        </div>
    );
};

export { SalahStats }