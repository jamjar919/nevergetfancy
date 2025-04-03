import { Metadata, ResolvingMetadata } from 'next';

import { FantasyManagerId } from '../../../../graphql/Reference';
import { getTeamNameForTitle } from '../../../components/framework/head/GetTeamNameForTitle';
import { FancyResult } from '../../../components/pages/fancy/FancyResult';
import { FancyContextProvider } from '../../../components/pages/fancy/context/FancyContext';

type Props = {
    params: Promise<{ teamId: string }>;
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { teamId } = await params;

    if (teamId) {
        return {
            title: `${await getTeamNameForTitle(teamId)} - NeverGetFancy`,
        };
    }
}

export default async function Page({ params }: { params: Promise<{ teamId: string }> }) {
    const { teamId } = await params;

    return (
        <FancyContextProvider>
            <FancyResult teamId={teamId as FantasyManagerId} />
        </FancyContextProvider>
    );
}
