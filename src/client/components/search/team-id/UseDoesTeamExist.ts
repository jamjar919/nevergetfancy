import {useCallback, useEffect, useState} from "react";
import {useDoesTeamExistLazyQuery} from "../../../../graphql/generated/Client";
import {debounce} from "../../../util/Debounce";

const useDoesTeamExist = (teamId: string): boolean => {
    const [teamExists, setTeamExists] = useState<boolean>(false);

    const [doesTeamExist] = useDoesTeamExistLazyQuery({
        variables: {
            teamId
        }
    });

    const validateTeamExists = useCallback(debounce(async (teamId: string) => {
        const { data } = await doesTeamExist({
            variables: {
                teamId
            }
        });

        setTeamExists(data?.doesFantasyTeamExist || false);
    }, 1000), []);

    useEffect(() => {
        validateTeamExists(teamId);
    }, [teamId]);

    return teamExists;
}

export { useDoesTeamExist }