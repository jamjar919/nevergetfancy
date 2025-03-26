import React from "react";
import {Leagues} from "../../../../components/pages/leagues/Leagues";
import {FantasyManagerId} from "../../../../../graphql/Reference";
import {Metadata, ResolvingMetadata} from "next";
import {getTeamNameForTitle} from "../../../../components/framework/head/GetTeamNameForTitle";

type Props = {
    params: Promise<{ teamId: string }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { teamId } = await params;

    if (teamId) {
        return {
            title: `${await getTeamNameForTitle(teamId)}'s leagues - NeverGetFancy`
        };
    }
}

export default async function Page({
   params
}:  {
    params: Promise<{ teamId: string }>
}) {
    const { teamId } = await params;

    return (
        <Leagues teamId={teamId as FantasyManagerId} />
    )
}