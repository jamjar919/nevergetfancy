import { useRef } from 'react';

enum TrackingEvent {
    shareTeam = 'share-team',
    searchByTeamName = 'search-by-team-name',
    searchByTeamId = 'search-by-team-id',
}

/**
 * Track a custom event
 * @param event The event to track
 */
const trackEvent = (event: TrackingEvent) => {
    try {
        console.debug(`Tracking event ${event}`);
        // window.plausible?.(event);
    } catch (e) {
        console.error(`Failed to track event ${event}`, e);
    }
};

// Hook to ensure that a tracking event is only tracked once per component lifecycle
const useTrackEventOnce = (event: TrackingEvent) => {
    const hasTracked = useRef(false);

    return () => {
        if (!hasTracked.current) {
            trackEvent(event);
            hasTracked.current = true;
        }
    };
};

export { trackEvent, useTrackEventOnce, TrackingEvent };
