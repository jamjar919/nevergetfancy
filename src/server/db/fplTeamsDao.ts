import {database} from "./connection";

const TABLE_NAME = 'fpl_teams';
enum Columns {
    id = 'id',
    teamName = 'teamName',
    managerName = 'managerName'
}

class FplTeamsDao {
    private static instance: FplTeamsDao;

    private constructor() {
        this.setup();
    }

    public static getInstance() {
        if (!FplTeamsDao.instance) {
            FplTeamsDao.instance = new FplTeamsDao();
        }
        return FplTeamsDao.instance;
    }

    // CBA to set up liquibase, so this just creates the tables if they don't exist
    // Create a table called fpl_teams if it doesn't exist yet
    private setup = () => {
        database.exec(`
            CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
                ${Columns.id} INT PRIMARY KEY,
                ${Columns.teamName} TEXT,
                ${Columns.managerName} TEXT
            );
        `)
    }

    public addTeam = (id: number, teamName: string, managerName: string) => {
        const statement = database.prepare(`
          INSERT INTO ${TABLE_NAME} (${Columns.id}, ${Columns.teamName}, ${Columns.managerName})
          VALUES (?, ?, ?);
        `);
        statement.run(Number(id), teamName, managerName);
    }

    public getMaxTeamId = (): number => {
        const statement = database.prepare(`
            SELECT MAX(${Columns.id}) as maxId FROM ${TABLE_NAME};
        `)
        return ((statement.get() as any)["maxId"] as any) ?? 0;
    }
}

export { FplTeamsDao }