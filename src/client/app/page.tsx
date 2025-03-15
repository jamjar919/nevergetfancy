import {FantasyManagerId} from "../../graphql/Reference";
import {FancyResult} from "../components/fancy/FancyResult";

export default function Page() {
    return (
        <FancyResult teamId={"2458154" as FantasyManagerId} />
    )
}