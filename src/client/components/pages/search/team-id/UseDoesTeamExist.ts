import {useCallback, useEffect} from "react";
import {useDoesTeamExistLazyQuery} from "../../../../../graphql/generated/Client";
import {debounce} from "../../../../util/Debounce";

const useDoesTeamExist = (teamId: string) => {
    const [fetchTeam, {data, loading, error}] = useDoesTeamExistLazyQuery({
        variables: {teamId}
    });

    const validateTeam = useCallback(
        debounce(async (id: string) => {
            await fetchTeam({variables: {teamId: id}});
        }, 1000),
        [fetchTeam]
    );

    useEffect(() => {
        validateTeam(teamId);
    }, [teamId, validateTeam]);

    return {data, loading, error};
};

export {useDoesTeamExist};