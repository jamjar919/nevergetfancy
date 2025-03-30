import { Pool } from 'pg';

import { FantasyManagerId } from '../../graphql/Reference';
import { TeamSearchResultDto } from './type/TeamSearchResultDto';

class SearchDao {
    private static instance: SearchDao;
    private connectionPool: Pool;

    private constructor() {
        const username = process.env.DB_USERNAME;
        const password = process.env.DB_PASSWORD;
        const host = process.env.DB_HOST;
        const port = process.env.DB_PORT;

        if (!username || !password || !host || !port) {
            throw new Error('Missing database connection information');
        }

        this.connectionPool = new Pool({
            host,
            user: username,
            password,
            port: Number(port),
            database: 'fpl',
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            ssl: true,
        });
    }

    public static getInstance() {
        if (!SearchDao.instance) {
            SearchDao.instance = new SearchDao();
        }
        return SearchDao.instance;
    }

    public ping = async () => {
        try {
            await this.connectionPool.query('SELECT NOW()');
            return true;
        } catch (e) {
            console.error('Failed to ping database', e);
            return false;
        }
    };

    public search = async (teamOrManagerName: string): Promise<TeamSearchResultDto[]> => {
        const tsQuery = teamOrManagerName.replace(/'/g, "''").split(' ').join(' & '); // Escape single quotes and format for tsquery
        const data = await this.connectionPool.query(
            `
            SELECT * FROM fpl_teams
            WHERE tsv @@ to_tsquery('english', $1)
            LIMIT 10
        `,
            [tsQuery]
        );

        return data.rows.map((row: any) => {
            return {
                id: String(row.id) as FantasyManagerId,
                teamName: row.team as string,
                managerName: row.manager as string,
            };
        });
    };
}

export { SearchDao };
