import { Pool } from 'pg';

import { FantasyManagerId } from '../../graphql/Reference';
import { createConnectionPool } from './connectionPool';
import { TeamSearchResultDto } from './type/TeamSearchResultDto';

class SearchDao {
    private static instance: SearchDao;
    private connectionPool: Pool;

    private constructor() {
        this.connectionPool = createConnectionPool();
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
