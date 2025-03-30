import { useCallback, useEffect, useState } from 'react';

import { useDoesTeamExistLazyQuery } from '../../../../../../graphql/generated/Client';
import { debounce } from '../../../../../util/Debounce';

const useDoesTeamExist = (teamId: string) => {
    const [waitingForDebounce, setWaitingForDebounce] = useState(false);

    const [fetchTeam, { data, loading, error }] = useDoesTeamExistLazyQuery({
        variables: { teamId },
    });

    const debouncedFetchTeam = useCallback(
        debounce(async (id: string) => {
            await fetchTeam({ variables: { teamId: id } });
            setWaitingForDebounce(false);
        }, 1000),
        [fetchTeam]
    );

    useEffect(() => {
        setWaitingForDebounce(true);
        debouncedFetchTeam(teamId);
    }, [teamId]);

    return { data, loading: loading || waitingForDebounce, error };
};

export { useDoesTeamExist };
