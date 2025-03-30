import bodyParser from 'body-parser';
import cors, { CorsRequest } from 'cors';
import 'dotenv/config';
import express from 'express';
import { readFileSync } from 'fs';
import http from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { Context } from '../graphql/Context';
import { Endpoints } from './constant/endpoints';
import { fetchPlayersAndTeams, getPlayers, getTeams } from './fpl/api/bootstrap/bootstrap';
import { resolvers } from './resolver/resolvers';
import { randomIntegerInRange } from './util/randomIntegerInRange';
import { setupLogs } from './util/setupLogs';

setupLogs();

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 16000;

/**
 * GRAPHQL
 */
const typeDefs = readFileSync('./src/graphql/schema.graphql', {
    encoding: 'utf-8',
});

const apolloServer = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Wait for apollo to start up
await apolloServer.start();

app.use(
    Endpoints.GRAPHQL,
    cors<CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
        context: async () => {
            return {};
        },
    })
);

/**
 * REST API
 */

app.get(Endpoints.PING, async (_, res) => {
    res.send('pong');
});

// Startup
await new Promise<void>(async (resolve) => {
    console.log('Fetching players and teams...');

    await fetchPlayersAndTeams();

    const players = getPlayers();
    const numPlayers = Object.keys(players).length;
    const numTeams = Object.keys(getTeams()).length;

    const randomPlayer = Object.values(players)[randomIntegerInRange(0, numPlayers - 1)];
    const randomPlayerTeam = getTeams()[randomPlayer.team];

    if (numPlayers === 0 || numTeams === 0) {
        console.error('❌ Failed to fetch players and teams');
        process.exit(1);
    }

    console.log('====================================');
    console.log(`🏃🏽 ${numPlayers} players`);
    console.log(`🏟️ ${numTeams} teams`);
    console.log(`🎲 Player of the day: ${randomPlayer.webName}, ${randomPlayerTeam.name}`);
    console.log('====================================');

    return httpServer.listen(port, () => resolve());
});

console.log(`🚀⚽  Active on port ${port}! Game on!`);
