import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { GetTeamNameDocument, GetTeamNameQueryResult } from '../../../../graphql/generated/Client';

// This function is used to get the team name for the title of the page
// It creates it's own ApolloClient to make the query rather than using the one from the ApolloWrapper
const getTeamNameForTitle = async (teamId: string) => {
    try {
        const graphQlHost = process.env.NEXT_PUBLIC_GRAPH_QL_HOST;

        if (!graphQlHost) {
            throw new Error(
                'No graphQl server configured, this should be set as an environment variable'
            );
        }

        const httpLink = new HttpLink({
            uri: graphQlHost,
            fetchOptions: { cache: 'no-store' },
        });

        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link: httpLink,
        });

        const result = await client.query<GetTeamNameQueryResult>({
            query: GetTeamNameDocument,
            variables: {
                teamId,
            },
        });

        return result?.data?.fantasyTeam?.name || 'Unknown';
    } catch (e) {
        console.error(e);
        return 'Unknown';
    }
};

export { getTeamNameForTitle };
