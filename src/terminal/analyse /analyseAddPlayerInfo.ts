import { getPlayers, prefetchPlayersAndTeams } from '../../server/fpl/api/bootstrap/bootstrap';
import { DatabaseSync } from 'node:sqlite';
import { setupAnalysisDb } from './setupAnalysisDb';

const analyseAddPlayerInfo = async (): Promise<void> => {
    const dbName = `analysis.db`;
    const database = new DatabaseSync(`./${dbName}`);

    setupAnalysisDb(database);
    await prefetchPlayersAndTeams();

    const players = Object.values(getPlayers());

    console.log(`Adding info for ${players.length} players...`);

    for (let i = 0; i < players.length; i++) {
        const {
            id,
            webName
        } = players[i];

        const stmt = database.prepare(`
            INSERT OR IGNORE INTO players (playerId, name) 
            VALUES (?, ?)
        `);
        stmt.run(id, webName);
    }

    return Promise.resolve();
}

export { analyseAddPlayerInfo }