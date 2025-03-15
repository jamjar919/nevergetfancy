import {FancyResult} from "../../../components/fancy/FancyResult";
import {FantasyManagerId} from "../../../../graphql/Reference";

export default async function Page({
    params
}:  {
    params: Promise<{ teamId: string }>
}) {
    const { teamId } = await params;

    return <FancyResult teamId={teamId as FantasyManagerId} />
}