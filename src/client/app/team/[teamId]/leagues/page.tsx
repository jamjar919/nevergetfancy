import React from "react";
import {Leagues} from "../../../../components/leagues/Leagues";
import {FantasyManagerId} from "../../../../../graphql/Reference";

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