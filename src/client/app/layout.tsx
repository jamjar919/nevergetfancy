import React from "react";
import {ApolloWrapper} from "../graphql/ApolloWrapper";

import "./_app.scss";

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return(
        <html lang="en">
            <body>
                <ApolloWrapper>
                    {children}
                </ApolloWrapper>
            </body>
        </html>
    )
}