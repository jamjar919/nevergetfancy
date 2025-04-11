import { FantasyManagerId } from '../../../../graphql/Reference';

// This is a simple response that just contains status information about a manager
export interface ManagerExistApiResponse {
    id: FantasyManagerId;
    // Other fields might be present but aren't used in the doesManagerExist.ts implementation
}