import {DatabaseSync} from "node:sqlite";

const dbName = "fplTeamsCombined.db"
const database = new DatabaseSync(`./${dbName}`);

const combineFplDatabases = (databases: string[]) => {
    console.log("Combining FPL databases...");
    databases.forEach((db) => {
        console.log(`Combining ${db}...`);
        database.exec(`ATTACH DATABASE '${db}' AS db`);
        database.exec(`
            INSERT INTO fpl_teams SELECT * FROM db.fpl_teams ON CONFLICT DO NOTHING;
            INSERT INTO not_found_teams SELECT * FROM db.not_found_teams ON CONFLICT DO NOTHING;
        `);
        database.exec("DETACH DATABASE db");
    });
    console.log("Done combining FPL databases");
}

export { combineFplDatabases }