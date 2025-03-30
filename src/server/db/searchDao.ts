import { DatabaseSync } from 'node:sqlite';

import { FantasyManagerId } from '../../graphql/Reference';
import { TeamSearchResultDto } from './type/TeamSearchResultDto';

class SearchDao {
    private static instance: SearchDao;
    private database: DatabaseSync;

    private constructor() {
        this.database = new DatabaseSync(`./fplTeams.db`);
    }

    public static getInstance() {
        if (!SearchDao.instance) {
            SearchDao.instance = new SearchDao();
        }
        return SearchDao.instance;
    }

    public search = (teamOrManagerName: string): TeamSearchResultDto[] => {
        const statement = this.database.prepare(`
            SELECT * FROM fpl_teams
            WHERE teamName LIKE ? OR managerName LIKE ?
            LIMIT 10
        `);

        const data = statement.all(`%${teamOrManagerName}%`, `%${teamOrManagerName}%`);

        return data.map((row: any) => {
            return {
                id: String(row.id) as FantasyManagerId,
                teamName: row.teamName as string,
                managerName: row.managerName as string,
            };
        });
    };
}

export { SearchDao };
