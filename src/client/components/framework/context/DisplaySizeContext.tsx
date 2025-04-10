'use client';

import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type DisplaySizeContextShape = {
    isMobile: boolean;
};

const DEFAULT_MOBILE_BREAKPOINT = 960;

const DisplaySizeContext = createContext<DisplaySizeContextShape>(null);
const useDisplaySize = () => useContext(DisplaySizeContext);

/**
 * Provider component that makes display size information available to any child component.
 */
const DisplaySizeProvider: React.FC<
    PropsWithChildren<{
        mobileBreakpoint?: number;
    }>
> = ({ children, mobileBreakpoint = DEFAULT_MOBILE_BREAKPOINT }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };

        // Initial check
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Clean up
        return () => window.removeEventListener('resize', checkIfMobile);
    }, [mobileBreakpoint]);

    return (
        <DisplaySizeContext.Provider
            value={{
                isMobile,
            }}
        >
            {children}
        </DisplaySizeContext.Provider>
    );
};

export { useDisplaySize, DisplaySizeProvider };
