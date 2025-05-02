import React from 'react';

const Ad: React.FC = () => {
    return (
        <>
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0821639487722953"
                crossOrigin="anonymous"
            ></script>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', marginBottom: '16px' }}
                data-ad-client="ca-pub-0821639487722953"
                data-ad-slot="5216931958"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </>
    );
};

export { Ad };
