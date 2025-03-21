import React from "react";
import {ApolloWrapper} from "../graphql/ApolloWrapper";
import {HeaderFooterLayout} from "../components/framework/HeaderFooterLayout";

import "./_app.scss";

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return(
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"} />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
                <meta content="width=device-width,initial-scale=1" name="viewport" />
                <title>Never Get Fancy</title>
            </head>
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