import { useRef } from 'react';

declare global {
    interface Window {
        plausible?: (event: TrackingEvent) => void;
    }
}

enum TrackingEvent {
    shareTeam = 'share-team',
    searchByTeamName = 'search-by-team-name',
    searchByTeamId = 'search-by-team-id',
    clickTeamCard = 'click-team-card',
}

/**
 * Track a custom event using Plausible
 * @param event The event to track, needs to be set up in plausible
 */
const trackEvent = (event: TrackingEvent) => {
    try {
        window.plausible?.(event)
    } catch (e) {
        console.error(`Failed to track event ${event}`, e);
    }
}

// Hook to ensure that a tracking event is only tracked once per component lifecycle
const useTrackEventOnce = (event: TrackingEvent) => {
    const hasTracked = useRef(false);

    return () => {
        if (!hasTracked.current) {
            trackEvent(event);
            hasTracked.current = true;
        }
    }
}

export { trackEvent, useTrackEventOnce, TrackingEvent };
