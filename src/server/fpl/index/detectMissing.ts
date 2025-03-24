import {FplTeamsDao} from "../../db/fplTeamsDao";

const dao = FplTeamsDao.getInstance();

// Detect missing entries in the FPL database
const detectMissing = (): string[] => {
    const maxId = dao.getMaxTeamId();
    console.log(`Max team id: ${maxId}`);
    console.log("Detecting missing teams...");

    let missing = 0;
    const missingTeams: string[] = [];
    for (let i = 1; i <= maxId; i++) {
        const team = dao.getTeam(i);

        if (!team) {
            console.log(`Missing team: ${i}`);
            missing++;
            missingTeams.push(i.toString());
        }
    }

    console.log(`Found ${missing} missing teams`);
    console.log(missingTeams)
    return missingTeams;
}

export { detectMissing }