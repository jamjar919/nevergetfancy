import { DatabaseSync } from 'node:sqlite';

const TABLE_NAME = 'fpl_teams';
const NOT_FOUND_TABLE_NAME = 'not_found_fpl_teams';
enum Columns {
    id = 'id',
    teamName = 'teamName',
    managerName = 'managerName',
}

type FplTeamDbRow = {
    id: number;
    teamName: string;
    managerName: string;
};

/**
 * DAO for indexing FPL teams
 * This creates a database called fplTeams.db in the current directory
 * It has a table called fpl_teams with columns id, teamName, managerName
 * It also has a table called not_found_fpl_teams with a single column id
 * I used this to index all the FPL teams so I could search by team name
 */
class IndexingDao {
    private static instance: IndexingDao;
    private static database = new DatabaseSync(`./fplTeams.db`);

    private constructor() {
        this.setup();
    }

    public static getInstance() {
        if (!IndexingDao.instance) {
            IndexingDao.instance = new IndexingDao();
        }
        return IndexingDao.instance;
    }

    // CBA to set up liquibase, so this just creates the tables if they don't exist
    // Create a table called fpl_teams if it doesn't exist yet
    private setup = () => {
        IndexingDao.database.exec(`
            CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
                ${Columns.id} INT PRIMARY KEY,
                ${Columns.teamName} TEXT,
                ${Columns.managerName} TEXT
            );
        `);

        IndexingDao.database.exec(`
            CREATE TABLE IF NOT EXISTS ${NOT_FOUND_TABLE_NAME}(
                ${Columns.id} INT PRIMARY KEY
            );
       `);
    };

    public addTeam = (id: number, teamName: string, managerName: string) => {
        const statement = IndexingDao.database.prepare(`
          INSERT INTO ${TABLE_NAME} (${Columns.id}, ${Columns.teamName}, ${Columns.managerName})
          VALUES (?, ?, ?);
        `);
        statement.run(Number(id), teamName, managerName);
    };

    public getTeam = (id: number): FplTeamDbRow | null => {
        const statement = IndexingDao.database.prepare(`
            SELECT ${Columns.id}, ${Columns.teamName}, ${Columns.managerName} FROM ${TABLE_NAME} WHERE ${Columns.id} = ?;
        `);

        const result = statement.get(id) as any;

        if (!result) {
            return null;
        }

        return {
            id: Number(result[Columns.id]),
            teamName: String(result[Columns.teamName]),
            managerName: String(result[Columns.managerName]),
        };
    };

    public isNotFoundTeam = (id: number): boolean => {
        const statement = IndexingDao.database.prepare(`
            SELECT ${Columns.id} FROM ${NOT_FOUND_TABLE_NAME} WHERE ${Columns.id} = ?;
        `);
        return statement.get(id) !== undefined;
    };

    public addNotFoundTeam = (id: number) => {
        const statement = IndexingDao.database.prepare(`
            INSERT INTO ${NOT_FOUND_TABLE_NAME} (${Columns.id})
            VALUES (?);
        `);
        statement.run(Number(id));
    };

    public getMaxTeamId = (): number => {
        const statement = IndexingDao.database.prepare(`
            SELECT MAX(${Columns.id}) as maxId FROM ${TABLE_NAME};
        `);
        return ((statement.get() as any)['maxId'] as any) ?? 0;
    };
}

export { IndexingDao };
