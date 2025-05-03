'use client';

import React, { PropsWithChildren, useEffect } from 'react';

const loadAllAds = () => {
    if (window.adsbygoogle.loaded) {
        return;
    }

    const ads = window.adsbygoogle || [];
    ads.push({});
};

const AdProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0821639487722953';
        script.async = true;
        script.onload = () => setTimeout(() => loadAllAds(), 100);
        document.body.appendChild(script);
    }, []);

    return <>{children}</>;
};

export { AdProvider };
