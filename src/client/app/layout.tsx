import React from 'react';

import { HeaderFooterLayout } from '../components/framework/HeaderFooterLayout';
import { DisplaySizeProvider } from '../components/framework/context/DisplaySizeContext';
import { ApolloWrapper } from '../graphql/ApolloWrapper';
import { GoogleAnalytics } from '@next/third-parties/google'

import './_app.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                {/* @ts-ignore */}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
                <meta content="width=device-width,initial-scale=1" name="viewport" />
                <GoogleAnalytics gaId={'G-BLPKVHCGYW'} />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body>
                <ApolloWrapper>
                    <DisplaySizeProvider>
                        <HeaderFooterLayout>{children}</HeaderFooterLayout>
                    </DisplaySizeProvider>
                </ApolloWrapper>
            </body>
        </html>
    );
}
