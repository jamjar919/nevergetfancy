import { Metadata, ResolvingMetadata } from 'next';

import React from 'react';

import { FantasyManagerId } from '../../../../../graphql/Reference';
import { getTeamNameForTitle } from '../../../../components/framework/head/GetTeamNameForTitle';
import { Leagues } from '../../../../components/pages/leagues/Leagues';

type Props = {
    params: Promise<{ teamId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { teamId } = await params;

    if (teamId) {
        return {
            title: `${await getTeamNameForTitle(teamId)}'s leagues - NeverGetFancy`,
        };
    }
}

export default async function Page({ params }: { params: Promise<{ teamId: string }> }) {
    const { teamId } = await params;

    return <Leagues teamId={teamId as FantasyManagerId} />;
}
