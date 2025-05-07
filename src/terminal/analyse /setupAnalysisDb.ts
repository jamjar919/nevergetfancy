import { DatabaseSync } from 'node:sqlite';

const setupAnalysisDb = (db: DatabaseSync) => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS teams (
            teamId TEXT PRIMARY KEY,
            teamName TEXT,
            managerName TEXT
        )
    `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS analysis (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            teamId TEXT,
            gameweek INTEGER,
            captainedPlayer INTEGER,
            captainPoints INTEGER,
            bestCaptainInTeam INTEGER,
            bestCaptainPoints INTEGER,
            rank INTEGER
        )
    `);
};

export { setupAnalysisDb };
