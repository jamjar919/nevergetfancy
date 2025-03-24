import {FplTeamsDao} from "../../db/fplTeamsDao";
import {fetchFromApi} from "../../util/fetchFromApi";
import {FantasyPremierLeagueApi} from "../api/apiConfig";
import {FantasyManagerId} from "../../../graphql/Reference";

const dao = FplTeamsDao.getInstance();

/**
 * The FPL api does not provide any native search functionality by team name, which is massively annoying
 * Thankfully, the team id is sequential, so we can pre-fetch all the teams and then store them in a database
 * Then we can load that DB into memory and search it for the team name.
 *
 * If you work for the PL and are reading this, please add a search endpoint to the API so I don't have to do this
 * and can save you some bandwidth.
 */
const indexTeams = async () => {

    // Total number of teams to scan
    const seekNumber = 1_000_000;

    // Number of synchronous requests to make at once
    const batchSize = 10;

    // How often to report progress
    const reportingInterval = batchSize * 10;

    const start = dao.getMaxTeamId() + 1;
    const end = start + seekNumber;

    console.log("Indexing teams...");
    console.log("This will take a while");
    console.log(`Scanning from ${start} to ${end}`);

    let numNotFound = 0;

    for (let i = start; i < end; i += batchSize) {
        if ((i - start) % reportingInterval === 0) {
            console.log(`${i}/${end}`);
            if (numNotFound > 0) {
                console.log(`[warn] Could not find ${numNotFound} teams in last 100`);
            }
            numNotFound = 0;
        }

        const promises = [];
        for (let j = 0; j < batchSize; j++) {
            promises.push(processSingleTeam(i + j).then((found) => {
                if (!found) {
                    numNotFound++;
                }
            }));
        }

        await Promise.all(promises)
    }
}

const processSingleTeam = async (teamId: number): Promise<boolean> => {
    const team = await fetchFromApi(FantasyPremierLeagueApi.Manager(String(teamId) as FantasyManagerId))
        .then((res) => res.json())
        .catch(() => ({}));

    if (!team?.id && !team?.name) {
        dao.addNotFoundTeam(teamId);
        return false;
    }

    const playerName = `${team.player_first_name} ${team.player_last_name}`;

    dao.addTeam(
        team.id,
        team.name,
        playerName,
    );

    return true;
}

export { indexTeams }
