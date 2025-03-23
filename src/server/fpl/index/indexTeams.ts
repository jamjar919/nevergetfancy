import {FplTeamsDao} from "../../db/fplTeamsDao";
import {fetchFromApi} from "../../util/fetchFromApi";
import {FantasyPremierLeagueApi} from "../api/apiConfig";
import {FantasyManagerId} from "../../../graphql/Reference";

/**
 * The FPL api does not provide any native search functionality by team name, which is massively annoying
 * Thankfully, the team id is sequential, so we can pre-fetch all the teams and then store them in a database
 * Then we can load that DB into memory and search it for the team name.
 *
 * If you work for the PL and are reading this, please add a search endpoint to the API so I don't have to do this
 * and can save you some bandwidth.
 */
const indexTeams = async () => {
    const dao = FplTeamsDao.getInstance();

    const batchSize = 1_000_000;
    const start = dao.getMaxTeamId() + 1;
    const end = start + batchSize;

    console.log("Indexing teams...");
    console.log("This will take a while");
    console.log(`Scanning from ${start} to ${end}`);

    let numNotFound = 0;

    for (let i = start; i < end; i += 1) {
        if (i % 100 === 0) {
            console.log(`${i}/${end}`);
            if (numNotFound > 0) {
                console.log(`[warn] Could not find ${numNotFound} teams in this batch`);
            }
            numNotFound = 0;
        }

        const team = await fetchFromApi(FantasyPremierLeagueApi.Manager(String(i) as FantasyManagerId))
            .then((res) => res.json())
            .catch(() => ({}));

        if (!team?.id && !team?.name) {
            numNotFound++;
            dao.addNotFoundTeam(i);
            continue;
        }

        const playerName = `${team.player_first_name} ${team.player_last_name}`;

        dao.addTeam(
            team.id,
            team.name,
            playerName,
        );
    }
}

export { indexTeams }
