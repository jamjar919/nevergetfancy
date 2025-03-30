'use client';

import React from 'react';

import { HttpLink } from '@apollo/client';
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

function makeClient() {
    const graphQlHost = process.env.NEXT_PUBLIC_GRAPH_QL_HOST

    if (!graphQlHost) {
        throw new Error("No graphQl server configured, this should be set as an environment variable")
    }

    const httpLink = new HttpLink({
        uri: graphQlHost,
        fetchOptions: { cache: 'no-store' },
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
