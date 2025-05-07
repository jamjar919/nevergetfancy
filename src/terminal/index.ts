import 'dotenv/config';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { EventId } from '../graphql/Reference';
import { indexTeams } from '../server/fpl/index/core/indexTeams';
import { IndexingDao } from '../server/fpl/index/dao/indexingDao';
import { analyse } from './analyse /analyse';
import { analyseAddPlayerInfo } from './analyse /analyseAddPlayerInfo';
import { combineFplDatabases } from './combine/combineFplDatabases';
import { detectMissing } from './detect-missing/detectMissing';
import { exportTeamsDb } from './import/exportTeamsDb';

const dao = IndexingDao.getInstance();
const defaultStart = dao.getMaxTeamId() + 1;

await yargs(hideBin(process.argv))
    .command(
        'index [start] [end] [batchSize]',
        'Start indexing FPL teams',
        (yargs) => {
            return yargs
                .positional('start', {
                    describe: 'Index to start with',
                    default: defaultStart,
                })
                .positional('end', {
                    describe: 'Index to end with',
                    default: defaultStart + 1_000_000,
                })
                .positional('batchSize', {
                    describe: 'Number of requests to make at once',
                    default: 8,
                });
        },
        async (argv) => {
            const { start, end, batchSize } = argv;

            // Validate arguments make sense
            if (start >= end) {
                throw new Error('Start must be less than end');
            }

            console.log('Calling main indexer:');

            await indexTeams(start, end, batchSize);
        }
    )
    .command(
        'index:detectmissing',
        'Detect missing fpl teams',
        () => {},
        async () => {
            detectMissing();
        }
    )
    .command(
        'combine [databases..]',
        'Combine FPL databases',
        (yargs) => {
            return yargs.positional('databases', {
                describe: 'Databases to combine',
                array: true,
                demandOption: true,
                default: [] as string[],
            });
        },
        async (argv) => {
            const { databases } = argv;

            if (!databases || databases.length === 0) {
                throw new Error('No databases provided');
            }

            console.log('Calling combine databases:');
            console.log(databases);
            combineFplDatabases(databases as string[]);
        }
    )
    .command(
        'exportteams',
        'Export FPL teams from a local database to a remote',
        () => {},
        () => {
            exportTeamsDb();
        }
    )
    .command(
        'analyse [top] [gameweek] [database]',
        'Collect stats on the top n players for a gameweek and save to a database',
        (yargs) => {
            return yargs
                .positional('top', {
                    describe: 'Top n players to analyse',
                    default: 1000,
                })
                .positional('gameweek', {
                    describe: 'The gameweek to analyse',
                    default: 1,
                });
        },
        async (argv) => {
            const { top, gameweek } = argv;

            // Validate arguments make sense
            if (top <= 0) {
                throw new Error('Top must be greater than 0');
            }
            if (gameweek <= 0) {
                throw new Error('Gameweek must be greater than 0');
            }

            console.log('Calling main analyse:');
            console.log(`Top: ${top}`);
            console.log(`Gameweek: ${gameweek}`);
            return analyse(top, gameweek as EventId);
        }
    )
    .command(
        'analyse:addplayerinfo',
        'Adds the player info to the analysis DB',
        () => {},
        async () => {
            return analyseAddPlayerInfo();
        }
    )
    .parse();
