import {DatabaseSync} from "node:sqlite";

const dbName = "fplTeams.db"

const database = new DatabaseSync(`./${dbName}`);

export { database }