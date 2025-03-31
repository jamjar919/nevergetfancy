'use client';

import React, { useEffect, useRef, useState } from 'react';

import { SearchInput } from '../../../framework/search-input/SearchInput';
import { EnterTeamNameSearchResult } from './search-result/EnterTeamNameSearchResult';

import styles from './EnterTeamName.module.scss';
import { trackEvent, TrackingEvent, useTrackEventOnce } from '../../../framework/tracking/trackEvent';

const MOST_COMMON_NAME = [
    'Hakuna Mateta',
    'Palmer Violets',
    'Alisson Wonderland',
    'Saka Potatoes',
    'Livin’ Saliba Loca',
    'Haven’t Jota Clue',
    'Slot Machine',
    'Ctrl Alt De Ligt',
    'ChickenTikkaMoSalah',
    'Kinder Mbeumo',
    'Corn on the Kobbie',
    'Old Havertz Kai Hard',
    'Bowen 747',
    'Turkish De Ligt',
    'Back of the Neto',
    'Snoop Udogie Dogg',
    'Pique Blinders',
    'Rice Rice Baby',
    'Major League Saka',
    'Expected Toulouse',
];

const EnterTeamName: React.FC = (props) => {
    const [query, setQuery] = useState<string>('');

    const trackChange = useTrackEventOnce(TrackingEvent.searchByTeamName);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setQuery(query);
        trackChange();
    };

    // Avoid SSR errors
    const [placeholder, setPlaceholder] = useState<string>('');
    useEffect(() => {
        setPlaceholder(MOST_COMMON_NAME[Math.floor(Math.random() * MOST_COMMON_NAME.length)]);
    }, []);

    return (
        <div className={styles.enterTeamName}>
            <div>
                <label className={styles.label}>Search for team:</label>
                <SearchInput placeholder={placeholder} onChange={handleChange} value={query} />
            </div>
            <div className={styles.result}>
                <EnterTeamNameSearchResult query={query.trim()} />
            </div>
        </div>
    );
};

export { EnterTeamName };
