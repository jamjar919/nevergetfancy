import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current viewport is mobile-sized
 * @param breakpoint - The width threshold in pixels below which the viewport is considered mobile (default: 768)
 * @returns boolean indicating if the current viewport is considered mobile
 */
export const useIsMobile = (breakpoint = 768): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Initial check
        checkIfMobile();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);
        
        // Clean up
        return () => window.removeEventListener('resize', checkIfMobile);
    }, [breakpoint]);

    return isMobile;
};