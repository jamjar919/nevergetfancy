'use client';

import React, { useEffect, useState } from 'react';

interface TickerProps {
    to: number;
    time: number; // ms
}

const Ticker: React.FC<TickerProps> = ({ to, time }) => {
    const [current, setCurrent] = useState(0);

    const timeForEachDigit = time / to;

    useEffect(() => {
        if (current >= to) {
            return;
        }

        const timeout = setInterval(() => {
            setCurrent((prev) => prev + 1);

            if (current >= to) {
                clearInterval(timeout);
            }
        }, timeForEachDigit);

        return () => clearTimeout(timeout);
    }, [current, timeForEachDigit]);

    return <>{current}</>;
};

export { Ticker };
