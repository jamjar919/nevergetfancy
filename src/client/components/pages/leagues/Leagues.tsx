'use client';

import Head from 'next/head';

import React from 'react';

import { FantasyManagerId } from '../../../../graphql/Reference';
import { useLeaguesForTeamQuery } from '../../../../graphql/generated/Client';
import { Header } from '../../framework/header/Header';
import { FullPageLoader } from '../../framework/loader/full-page/FullPageLoader';
import { League } from './league/League';
import { LeagueLinks } from './links/LeagueLinks';
import { LeagueSearch } from './search/LeagueSearch';

import styles from './Leagues.module.scss';
import { FullPageError } from '../../framework/loader/full-page/FullPageError';

type LeaguesProps = {
    teamId: FantasyManagerId;
};

const Leagues: React.FC<LeaguesProps> = ({ teamId }) => {
    const { data, error, loading } = useLeaguesForTeamQuery({
        variables: {
            fantasyTeamId: teamId,
        },
    });

    if (error) {
        return (<FullPageError />)
    }

    if (!data) {
        return <FullPageLoader />;
    }

    const {
        fantasyTeam: {
            leagues,
            manager: { name },
        },
    } = data;

    return (
        <div>
            <header>
                <Header title={'Leagues'} subtitle={`For ${name}`} />
            </header>
            <div className={styles.links}>
                <LeagueLinks teamId={teamId} />
            </div>
            <LeagueSearch leagues={leagues} />
            {leagues.map((league) => (
                <League key={league.id} league={league} />
            ))}
        </div>
    );
};

export { Leagues };
