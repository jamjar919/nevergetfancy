import { DatabaseSync } from 'node:sqlite';

import { EventId, FantasyLeagueId } from '../../graphql/Reference';
import {
    prefetchPlayerPerformances,
    prefetchPlayersAndTeams,
} from '../../server/fpl/api/bootstrap/bootstrap';
import { getLeagueStandings } from '../../server/fpl/api/league/getLeagueStandings';
import { getBestCaptainPickInTeamForGameWeek } from '../../server/fpl/api/picks/getBestCaptainPickInTeamForGameWeek';
import { getGameweekHistory } from '../../server/fpl/api/picks/getGameweekHistory';
import { getPlayerPreviousGame } from '../../server/fpl/api/player/getPlayerPreviousGame';
import { getCaptainForGameweek } from '../../server/fpl/fancy/gameweek/getCaptainForGameweek';
import { setupAnalysisDb } from './setupAnalysisDb';

const LEAGUE_ID_OVERALL = '314' as FantasyLeagueId;

const analyse = async (numPlayers: number, gameweek: EventId): Promise<void> => {
    const dbName = `analysis.db`;
    const database = new DatabaseSync(`./${dbName}`);

    await prefetchPlayersAndTeams();
    await prefetchPlayerPerformances(gameweek);
    setupAnalysisDb(database);

    const standings = await getLeagueStandings(LEAGUE_ID_OVERALL, numPlayers);

    // Insert team into db
    for (const standing of standings) {
        const { teamId, teamName, playerName } = standing;
        const stmt = database.prepare(`
            INSERT OR IGNORE INTO teams (teamId, teamName, managerName) 
            VALUES (?, ?, ?)
        `);
        stmt.run(teamId, teamName, playerName);
    }

    console.log(`Inserted ${standings.length} teams into the database.`);

    for (const [idx, standing] of standings.entries()) {
        try {
            if (idx % 250 === 0) {
                console.log(`Processing team ${idx + 1}/${standings.length}...`);
            }

            // Get team + captain for the gameweek
            const gameweekHistory = await getGameweekHistory(standing.teamId, gameweek);

            // record the captains score
            const captainedPlayer = getCaptainForGameweek(gameweekHistory).captainId;
            const { points: captainPoints } = (await getPlayerPreviousGame(
                captainedPlayer,
                gameweek
            ))!;

            // record their best player
            const bestCaptainInTeam = await getBestCaptainPickInTeamForGameWeek(
                standing.teamId,
                gameweek
            );
            const { points: bestCaptainPoints } = (await getPlayerPreviousGame(
                bestCaptainInTeam,
                gameweek
            ))!;

            // Insert into the DB
            const stmt = database.prepare(`
                INSERT INTO analysis (gameweek, teamId, captainedPlayer, captainPoints, bestCaptainInTeam, bestCaptainPoints, rank) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `);
            stmt.run(
                gameweek,
                standing.teamId,
                captainedPlayer,
                captainPoints,
                bestCaptainInTeam,
                bestCaptainPoints,
                standing.rank
            );
        } catch (error) {
            console.error(`Error processing team ${standing.teamId}:`, error);
        }
    }

    await Promise.resolve();

    return Promise.resolve();
};

export { analyse };
