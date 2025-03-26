import {FancyResult} from "../../../components/pages/fancy/FancyResult";
import {FantasyManagerId} from "../../../../graphql/Reference";
import {Metadata, ResolvingMetadata} from "next";
import {GetTeamNameDocument, useGetTeamNameQuery} from "../../../../graphql/generated/Client";
import {HttpLink} from "@apollo/client";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {getTeamNameForTitle} from "../../../components/framework/head/GetTeamNameForTitle";

type Props = {
    params: Promise<{ teamId: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { teamId } = await params;

    if (teamId) {
        return {
            title: `${await getTeamNameForTitle(teamId)} - NeverGetFancy`
        };
    }
}

export default async function Page({
    params
}:  {
    params: Promise<{ teamId: string }>
}) {
    const { teamId } = await params;

    return <FancyResult teamId={teamId as FantasyManagerId} />
}