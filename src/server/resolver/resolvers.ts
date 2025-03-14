import {Resolvers} from "../../graphql/generated/Resolver";
import {FantasyTeam} from "../../graphql/generated/Client";

export const resolvers: Resolvers = {
    Query: {
        fantasyTeam: async (): Promise<FantasyTeam> => {
            return {
                name: "Cool team",
                id: "1",
                manager: {
                    id: "1",
                    name: "John Doe"
                }
            }
        }
    }
}