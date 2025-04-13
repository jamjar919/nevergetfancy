'use client';

import React, { useState } from 'react';

import { FancyComparisonType } from '../../../../../graphql/generated/Client';
import { Badge } from '../../../framework/badge/Badge';
import { trackEvent, TrackingEvent } from '../../../framework/tracking/trackEvent';
import { reverseComparisonTypeMap } from '../context/FancyContext';

type FancyShareProps = {
    comparisonType: FancyComparisonType;
    points: number;
};

const getMessage = (points: number, comparisonType: FancyComparisonType) => {
    if (comparisonType === FancyComparisonType.Salah) {
        if (points < 0) {
            return `I got fancy too often and lost ${Math.abs(points)} points not captaining Salah every game.`;
        }

        return `I scored ${points} extra points by not captaining Salah every game.`;
    }

    if (comparisonType === FancyComparisonType.Haaland) {
        if (points < 0) {
            return `I got fancy too often and lost ${Math.abs(points)} points not captaining Haaland every game.`;
        }

        return `I scored ${points} extra points by not captaining Haaland every game.`;
    }

    if (comparisonType === FancyComparisonType.BestPlayerInTeam) {
        if (points < 0) {
            return `I got lost ${Math.abs(points)} points not captaining the best player in my team every game.`;
        }

        if (points === 0) {
            return `I am prescient - I picked the player who scored the most points in my team every time.`;
        }

        return 'This should be impossible.';
    }

    if (comparisonType === FancyComparisonType.BestPlayerOverall) {
        if (points < 0) {
            return `I lost ${Math.abs(points)} points due to my captain picks, compared to the very best players I should have had in my team.`;
        }

        if (points === 0) {
            return `I am a god - I picked the player who scored the most points in FPL every single time.`;
        }

        return 'This also should be impossible.';
    }
};

const FancyShare: React.FC<FancyShareProps> = (props) => {
    const { points, comparisonType } = props;

    const [isCopied, setIsCopied] = useState(false);

    const handleClick = () => {
        trackEvent(TrackingEvent.shareTeam);

        const message = getMessage(points, comparisonType);

        // Create the URL with proper query parameter
        const url = new URL(window.location.href);
        // Only include comparison param if not Salah (default)
        if (comparisonType !== FancyComparisonType.Salah) {
            url.searchParams.set('comparison', reverseComparisonTypeMap[comparisonType]);
        } else {
            url.searchParams.delete('comparison');
        }

        navigator.clipboard.writeText(`${message} - View my team at ${url.toString()}`);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 7500);

        if (navigator.share) {
            navigator
                .share({
                    title: message,
                    text: 'View my team at',
                    url: url.toString(),
                })
                .catch(console.error);
        }
    };

    const content = isCopied ? 'Copied to clipboard!' : 'Share your score 🔗';

    return <Badge onClick={handleClick}>{content}</Badge>;
};

export { FancyShare };
