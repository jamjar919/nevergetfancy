import React from "react";
import {Header} from "../../framework/header/Header";
import {SalahStats} from "./salah/SalahStats";
import {TeamSuggestions} from "./team-suggestions/TeamSuggestions";

import styles from "./Search.module.scss"
import {EnterTeamName} from "./team-name/EnterTeamName";

enum OpenSearchModes {
    CLOSED = "CLOSED",
    SEARCH_BY_NAME = "SEARCH_BY_NAME",
    SEARCH_BY_ID = "SEARCH_BY_ID"
}

const Search: React.FC = () => {
    return (
        <div className={styles.searchPage}>
            <header>
                <Header title={"NeverGetFancy"} subtitle={`A stupid concept by James`} />
            </header>
            <div className={styles.salahStats}>
                <SalahStats />
            </div>
            <div className={styles.about}>
                Mo Salah is on for a legendary run in Fantasy Premier League, with the <strong>highest points total</strong> for a single player, <strong>ever</strong>.
                How many points did you lose out on this season by not perma-capping him?
            </div>
            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    <EnterTeamName />
                </div>
            </div>
            <TeamSuggestions />
        </div>
    )
}

export { Search }