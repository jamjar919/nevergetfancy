import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {GetTeamNameDocument, GetTeamNameQueryResult} from "../../../../graphql/generated/Client";

// This function is used to get the team name for the title of the page
// It creates it's own ApolloClient to make the query rather than using the one from the ApolloWrapper
const getTeamNameForTitle = async (teamId: string) => {
    try {
        const httpLink = new HttpLink({
            uri: "http://localhost:16000/graphql",
            fetchOptions: {cache: "no-store"},
        });

        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link: httpLink,
        });

        const result = await client.query<GetTeamNameQueryResult>({
            query: GetTeamNameDocument,
            variables: {
                teamId
            }
        })

        return result?.data?.fantasyTeam?.name || "Unknown";
    } catch (e) {
        console.error(e);
        return "Unknown";
    }
}

export { getTeamNameForTitle }