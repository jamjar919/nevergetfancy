import {database} from "./connection";

const TABLE_NAME = 'fpl_teams';
const NOT_FOUND_TABLE_NAME = 'not_found_fpl_teams';
enum Columns {
    id = 'id',
    teamName = 'teamName',
    managerName = 'managerName'
}

type FplTeamDbRow = {
    id: number;
    teamName: string;
    managerName: string;
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
        `);

        database.exec(`
            CREATE TABLE IF NOT EXISTS ${NOT_FOUND_TABLE_NAME}(
                ${Columns.id} INT PRIMARY KEY
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

    public getTeam = (id: number): FplTeamDbRow | null => {
        const statement = database.prepare(`
            SELECT ${Columns.id}, ${Columns.teamName}, ${Columns.managerName} FROM ${TABLE_NAME} WHERE ${Columns.id} = ?;
        `);

        const result = statement.get(id) as any;

        if (!result) {
            return null;
        }

        return {
            id: Number(result[Columns.id]),
            teamName: String(result[Columns.teamName]),
            managerName: String(result[Columns.managerName])
        };
    };

    public addNotFoundTeam = (id: number) => {
        const statement = database.prepare(`
            INSERT INTO ${NOT_FOUND_TABLE_NAME} (${Columns.id})
            VALUES (?);
        `);
        statement.run(Number(id));
    }

    public getMaxTeamId = (): number => {
        const statement = database.prepare(`
            SELECT MAX(${Columns.id}) as maxId FROM ${TABLE_NAME};
        `)
        return ((statement.get() as any)["maxId"] as any) ?? 0;
    }
}

export { FplTeamsDao }