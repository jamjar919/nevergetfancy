import { FantasyManagerId } from '../../graphql/Reference';
import { TeamSearchResultDto } from './type/TeamSearchResultDto';
import { Pool } from 'pg';

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
        });
    }

    public static getInstance() {
        if (!SearchDao.instance) {
            SearchDao.instance = new SearchDao();
        }
        return SearchDao.instance;
    }

    public search = async (teamOrManagerName: string): Promise<TeamSearchResultDto[]> => {
        const data = await this.connectionPool.query(`
            SELECT * FROM fpl_teams
            WHERE teamName LIKE $1 OR managerName LIKE $2
            LIMIT 10
        `, [`%${teamOrManagerName}%`, `%${teamOrManagerName}%`]);

        return data.rows.map((row: any) => {
            return {
                id: String(row.id) as FantasyManagerId,
                teamName: row.teamName as string,
                managerName: row.managerName as string,
            };
        });
    };
}

export { SearchDao };
