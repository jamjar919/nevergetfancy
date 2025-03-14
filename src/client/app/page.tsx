import {FantasyTeamId} from "../types/Reference";
import {FantasyTeam} from "../components/fantasy-team/FantasyTeam";

export default function Page() {
    return (
        <FantasyTeam teamId={"2458154" as FantasyTeamId} />
    )
}