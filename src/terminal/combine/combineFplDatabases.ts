import {DatabaseSync} from "node:sqlite";

const combineFplDatabases = (databases: string[]) => {
    const dbName = "fplTeamsCombined.db"
    const database = new DatabaseSync(`./${dbName}`);

    database.exec(`
        CREATE TABLE IF NOT EXISTS fpl_teams(
            id INT PRIMARY KEY,
            teamName TEXT,
            managerName TEXT
        );
    `);

    database.exec(`
        CREATE TABLE IF NOT EXISTS not_found_fpl_teams(
            id INT PRIMARY KEY
        );
   `)

    console.log("Combining FPL databases...");
    databases.forEach((db) => {
        console.log(`Combining ${db}...`);
        database.exec(`ATTACH DATABASE '${db}' AS db`);
        database.exec(`
            INSERT OR IGNORE INTO fpl_teams SELECT * FROM db.fpl_teams;
            INSERT OR IGNORE INTO not_found_fpl_teams SELECT * FROM db.not_found_fpl_teams;
        `);
        database.exec("DETACH DATABASE db");
    });
    console.log("Done combining FPL databases");
}

export { combineFplDatabases }