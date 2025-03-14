import {Resolvers} from "../../graphql/generated/Resolver";
import {FantasyTeamManagerDto} from "../fpl/api/type/FantasyTeamManagerDto";
import {getManager} from "../fpl/api/team/getManager";
import {FantasyManagerId} from "../../graphql/Reference";

export const resolvers: Resolvers = {
    Query: {
        fantasyTeam: async (_: {}, args: { id: string }) => {
            const managerResponse: FantasyTeamManagerDto = await getManager(args.id as FantasyManagerId);

            return {
                id: managerResponse.id,
                name: managerResponse.teamName,
                manager: {
                    name: managerResponse.playerFirstName + " " + managerResponse.playerLastName
                }
            }
        }
    }
}