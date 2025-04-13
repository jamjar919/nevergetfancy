'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import React, { createContext, PropsWithChildren, useContext, useState, useEffect } from 'react';

import { FancyComparisonType } from '../../../../../graphql/generated/Client';

// Map nice URL parameters to enum values
const comparisonTypeMap = {
    salah: FancyComparisonType.Salah,
    haaland: FancyComparisonType.Haaland,
    bestPlayerInTeam: FancyComparisonType.BestPlayerInTeam,
    bestPlayerOverall: FancyComparisonType.BestPlayerOverall,
};

// Map enum values to nice URL parameters
const reverseComparisonTypeMap = {
    [FancyComparisonType.Salah]: 'salah',
    [FancyComparisonType.Haaland]: 'haaland',
    [FancyComparisonType.BestPlayerInTeam]: 'bestPlayerInTeam',
    [FancyComparisonType.BestPlayerOverall]: 'bestPlayerOverall',
};

type FancyContextShape = {
    comparisonType: FancyComparisonType;
    setComparisonType: (comparisonType: FancyComparisonType) => void;
};

type FancyContextProviderProps = {
    defaultComparisonType?: FancyComparisonType;
};

const FancyContext = createContext<FancyContextShape>(null);
const useFancyContext = () => useContext(FancyContext);

const FancyContextProvider: React.FC<PropsWithChildren<FancyContextProviderProps>> = ({
    children,
    defaultComparisonType,
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Get initial comparison type from URL query parameter 'comparison' if available
    const comparisonParam = searchParams.get('comparison');

    // Map from nice URL parameter to enum value, defaulting to Salah if unrecognized
    const comparisonTypeFromUrl = comparisonParam
        ? comparisonTypeMap[comparisonParam] || FancyComparisonType.Salah
        : undefined;

    // Initial state: URL param > default prop > Salah (fallback)
    const [comparisonType, setComparisonTypeState] = useState<FancyComparisonType>(
        comparisonTypeFromUrl || defaultComparisonType || FancyComparisonType.Salah
    );

    // Update URL whenever comparison type changes
    const setComparisonType = (newComparisonType: FancyComparisonType) => {
        setComparisonTypeState(newComparisonType);

        // Only add query param if not using the default 'Salah' type
        if (newComparisonType !== FancyComparisonType.Salah) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('comparison', reverseComparisonTypeMap[newComparisonType]);
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        } else {
            // Remove query param if using default 'Salah' type
            const params = new URLSearchParams(searchParams.toString());
            params.delete('comparison');
            router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, {
                scroll: false,
            });
        }
    };

    return (
        <FancyContext.Provider
            value={{
                comparisonType,
                setComparisonType,
            }}
        >
            {children}
        </FancyContext.Provider>
    );
};

export { useFancyContext, FancyContextProvider, comparisonTypeMap, reverseComparisonTypeMap };
