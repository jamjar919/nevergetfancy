import React from "react";
import {ApolloWrapper} from "../graphql/ApolloWrapper";
import {HeaderFooterLayout} from "../components/framework/HeaderFooterLayout";

import "./_app.scss";

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return(
        <html lang="en">
            <body>
                <ApolloWrapper>
                    <HeaderFooterLayout>
                        {children}
                    </HeaderFooterLayout>
                </ApolloWrapper>
            </body>
        </html>
    )
}