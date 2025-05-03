import { Metadata, ResolvingMetadata } from 'next';

import { FantasyManagerId } from '../../../../graphql/Reference';
import { getTeamNameForTitle } from '../../../components/framework/head/GetTeamNameForTitle';
import { FancyResult } from '../../../components/pages/fancy/FancyResult';
import {
    FancyContextProvider,
    comparisonTypeMap,
} from '../../../components/pages/fancy/context/FancyContext';
import { AdProvider } from '../../../components/framework/ad/AdProvider';

type Props = {
    params: Promise<{ teamId: string }>;
    searchParams?: Promise<{ comparison?: string }>;
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

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ teamId: string }>;
    searchParams?: Promise<{ comparison?: string }>;
}) {
    const { teamId } = await params;
    const { comparison } = await searchParams;

    // Convert from nice URL parameter to enum value
    // If the parameter doesn't match any known value, defaultComparisonType will be undefined,
    // and FancyContextProvider will use its built-in default (Salah)
    const defaultComparisonType = comparison ? comparisonTypeMap[comparison] : undefined;

    return (
        <AdProvider>
            <FancyContextProvider defaultComparisonType={defaultComparisonType}>
                <FancyResult teamId={teamId as FantasyManagerId} />
            </FancyContextProvider>
        </AdProvider>
    );
}
