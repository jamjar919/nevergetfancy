'use client';

import React, { useState } from 'react';

import { Header } from '../../framework/header/Header';
import { SalahStats } from './salah/SalahStats';
import { EnterTeamId } from './team-id/EnterTeamId';
import { EnterTeamName } from './team-name/EnterTeamName';
import { TeamSuggestions } from './team-suggestions/TeamSuggestions';

import styles from './Search.module.scss';

enum OpenSearchModes {
    SEARCH_BY_NAME = 'SEARCH_BY_NAME',
    SEARCH_BY_ID = 'SEARCH_BY_ID',
}

const Search: React.FC = () => {
    const [openSearchMode, setOpenSearchMode] = useState<OpenSearchModes>(
        OpenSearchModes.SEARCH_BY_NAME
    );

    const SearchComponent = () => {
        switch (openSearchMode) {
            case OpenSearchModes.SEARCH_BY_NAME:
                return <EnterTeamName />;
            case OpenSearchModes.SEARCH_BY_ID:
                return <EnterTeamId />;
        }
    };

    const switchSearch = () => {
        setOpenSearchMode(
            openSearchMode === OpenSearchModes.SEARCH_BY_NAME
                ? OpenSearchModes.SEARCH_BY_ID
                : OpenSearchModes.SEARCH_BY_NAME
        );
    };

    const switchSearchText =
        openSearchMode === OpenSearchModes.SEARCH_BY_NAME ? 'search by ID' : 'search by name';

    return (
        <div className={styles.searchPage}>
            <header>
                <Header title={'NeverGetFancy'} subtitle={`A stupid concept by James`} />
            </header>
            <div className={styles.salahStats}>
                <SalahStats />
            </div>
            <div className={styles.about}>
                Mo Salah is on for a legendary run in Fantasy Premier League, with the{' '}
                <strong>highest points total</strong> for a single player, <strong>ever</strong>.
                How many points did you lose out on this season by not perma-capping him?
            </div>
            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    <SearchComponent />
                </div>
                <div>
                    Can't find your team? You can also{' '}
                    <button className={styles.switchSearch} onClick={() => switchSearch()}>
                        {switchSearchText}
                    </button>
                    .
                </div>
            </div>
            <TeamSuggestions />
        </div>
    );
};

export { Search };
