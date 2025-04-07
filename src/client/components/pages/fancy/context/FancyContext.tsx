'use client';

import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

import { FancyComparisonType } from '../../../../../graphql/generated/Client';

type FancyContextShape = {
    comparisonType: FancyComparisonType;
    setComparisonType: (comparisonType: FancyComparisonType) => void;
};

const FancyContext = createContext<FancyContextShape>(null);
const useFancyContext = () => useContext(FancyContext);

const FancyContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [comparisonType, setComparisonType] = useState<FancyComparisonType>(
        FancyComparisonType.Salah
    );

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

export { useFancyContext, FancyContextProvider };
