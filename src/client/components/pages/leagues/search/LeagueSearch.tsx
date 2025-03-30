import React, { useCallback, useMemo, useState } from 'react';

import {
    FantasyLeagueStanding,
    LeagueAttributesFragment,
} from '../../../../../graphql/generated/Client';
import { debounce } from '../../../../util/Debounce';
import { LeagueParticipant } from '../participant/LeagueParticipant';

import styles from './LeagueSearch.module.scss';

type LeagueSearchProps = {
    leagues: LeagueAttributesFragment[];
};

type SearchableStanding = FantasyLeagueStanding & {
    leagueId: string;
};

const getFilteredStanding = (
    allStandings: SearchableStanding[],
    searchValue: string
): SearchableStanding[] => {
    if (!searchValue) {
        return [];
    }

    return allStandings
        .filter(
            ({ teamName, playerName }) =>
                teamName.toLowerCase().includes(searchValue) ||
                playerName.toLowerCase().includes(searchValue)
        )
        .map((standing) => ({
            ...standing,
        }));
};

const MAX_STANDINGS_TO_SHOW = 25;

/**
 * Quick and dirty search component to search through a users leagues
 */
const LeagueSearch: React.FC<LeagueSearchProps> = (props) => {
    const { leagues } = props;

    const allStandings: SearchableStanding[] = useMemo(
        () =>
            leagues.flatMap((league) =>
                league.standings.map((standing) => ({
                    ...standing,
                    leagueId: league.id,
                }))
            ),
        [props.leagues]
    );

    // Save search value in state
    const [searchValue, setSearchValue] = useState('');
    const handleChange = useCallback(
        debounce(
            (event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(String(event.target.value).toLowerCase()),
            50
        ),
        []
    );

    const filteredStandings = getFilteredStanding(allStandings, searchValue);

    let searchResultsSummary = '';
    if (filteredStandings.length === 0) {
        searchResultsSummary = 'No results found';
    } else if (filteredStandings.length !== allStandings.length) {
        searchResultsSummary = `Showing ${filteredStandings.length} of ${allStandings.length} results`;
    }

    return (
        <div>
            <div className={styles.search}>
                Search teams or players from your leagues:
                <input
                    className={styles.input}
                    onChange={handleChange}
                    placeholder={'Type a team or player name...'}
                />
            </div>
            <div className={styles.searchSummary}>{searchValue !== '' && searchResultsSummary}</div>
            <div className={styles.searchResults}>
                {filteredStandings
                    .filter((_, idx) => idx < MAX_STANDINGS_TO_SHOW)
                    .map((searchResult) => (
                        <LeagueParticipant
                            key={searchResult.teamId + searchResult.leagueId}
                            standing={searchResult}
                        />
                    ))}
            </div>
        </div>
    );
};

export { LeagueSearch };
