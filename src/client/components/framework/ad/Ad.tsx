import React from 'react';

const Ad: React.FC = () => {
    // Ad placeholder
    if (process?.env?.NODE_ENV === 'development') {
        return (
            <div style={{ display: 'block', marginBottom: '16px', height: '250px', backgroundColor: '#f0f0f0', textAlign: 'center', lineHeight: '250px' }}>
                Ad
            </div>
        );
    }

    return (
        <>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', marginBottom: '16px' }}
                data-ad-client="ca-pub-0821639487722953"
                data-ad-slot="5216931958"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </>
    );
};

export { Ad };
