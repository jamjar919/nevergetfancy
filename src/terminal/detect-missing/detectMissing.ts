import {IndexingDao} from "../../server/fpl/index/dao/indexingDao";
import {processSingleTeam} from "../../server/fpl/index/core/indexTeams";

const dao = IndexingDao.getInstance();

// Detect missing entries in the FPL database
const detectMissing = async () => {
    const maxId = dao.getMaxTeamId();
    console.log(`Max team id: ${maxId}`);
    console.log("Detecting missing teams...");

    let missing = 0;
    const missingTeams: string[] = [];
    for (let i = 1; i <= maxId; i++) {
        const team = dao.getTeam(i);

        if (!team) {
            const notFound = dao.isNotFoundTeam(i);

            if (!notFound) {
                console.log(`Missing team: ${i}`);
                missing++;
                missingTeams.push(i.toString());
            }
        }
    }

    console.log(`Found ${missing} missing teams`);
    console.log(missingTeams);

    console.log("Attempting to fix missing teams...");

    for (const teamId of missingTeams) {
        const success = await processSingleTeam(Number(teamId));
        if (success) {
            console.log(`Fixed team ${teamId} and inserted into database`);
        } else {
            console.error(`Fixed to fetch team: ${teamId} will insert into not found table`);
            dao.addNotFoundTeam(Number(teamId));
        }
    }

    console.log("Done!");
}

export { detectMissing }