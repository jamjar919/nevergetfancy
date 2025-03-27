import {useCallback, useEffect, useState} from "react";
import {useDoesTeamExistLazyQuery, useSearchFantasyTeamLazyQuery} from "../../../../../../graphql/generated/Client";
import {debounce} from "../../../../../util/Debounce";

const useSearchForTeam = (query: string) => {
    const [waitingForDebounce, setWaitingForDebounce] = useState(false);

    const [fetchTeam, {data, loading, error}] = useSearchFantasyTeamLazyQuery({
        variables: {query}
    });

    const debouncedFetchTeam = useCallback(
        debounce(async (query: string) => {
            await fetchTeam({variables: {query}});
            setWaitingForDebounce(false);
        }, 1000),
        [fetchTeam]
    );

    useEffect(() => {
        setWaitingForDebounce(true);
        debouncedFetchTeam(query);
    }, [query]);

    return {data, loading: loading || waitingForDebounce, error};
};

export {useSearchForTeam};