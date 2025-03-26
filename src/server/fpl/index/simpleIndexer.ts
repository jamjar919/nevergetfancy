import {indexTeams} from "./core/indexTeams";
import {IndexingDao} from "./dao/indexingDao";

const dao = IndexingDao.getInstance();

const indexTeamsWhereWeLeftOff = async () => {
    // Total number of teams to scan
    const seekNumber = 1_000_000;

    // Number of synchronous requests to make at once
    const batchSize = 10;

    const start = dao.getMaxTeamId() + 1;
    const end = start + seekNumber;

    return indexTeams(
        start,
        end,
        batchSize
    )
}


export { indexTeamsWhereWeLeftOff }