import { DatabaseSync } from 'node:sqlite';
import { Pool } from 'pg';

const exportTeamsDb = async () => {
    const dbName = 'fplTeams.db';
    const sourceDatabase = new DatabaseSync(`./${dbName}`);

    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;

    if (!username || !password || !host || !port) {
        throw new Error('Missing database connection information');
    }

    const destinationConnectionPool = new Pool({
        host,
        user: username,
        password,
        port: Number(port),
        database: 'fpl',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        ssl: true
    });

    const client = await destinationConnectionPool.connect();
    const batchSize = 10000;
    let numInserted = 0;

    try {
        await client.query('BEGIN');

        // Get the minimum and maximum IDs from the source database
        const minId = (sourceDatabase.prepare('SELECT MIN(id) as minId FROM fpl_teams') as any).get().minId;
        const maxId = (sourceDatabase.prepare('SELECT MAX(id) as maxId FROM fpl_teams') as any).get().maxId;

        for (let startId = minId; startId <= maxId; startId += batchSize) {
            const endId = Math.min(startId + batchSize - 1, maxId);
            const teams = sourceDatabase.prepare('SELECT * FROM fpl_teams WHERE id BETWEEN ? AND ?').all(startId, endId);

            console.log(`Processing teams ${startId} to ${endId}, found ${teams.length} teams`);

            if (teams.length > 0) {
                const batch = teams.map((team: any) => [team.id, team.teamName, team.managerName]);
                const queryText = 'INSERT INTO fpl_teams (id, team, manager) VALUES ' +
                    batch.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`).join(', ');
                const queryValues = batch.flat();
                await client.query({
                    text: queryText,
                    values: queryValues
                });
                numInserted += batch.length;
                console.log(`Inserted ${numInserted} teams`);
            }
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export { exportTeamsDb }