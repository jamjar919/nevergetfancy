import { Pool } from 'pg';

const createConnectionPool = (): Pool => {
    const user = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const host = process.env.DB_HOST;
    const port = Number(process.env.DB_PORT);

    let ca = process.env.DB_CACERT;
    if (!ca) {
        console.log('Loading CA from file as no environment variable was supplied');
        const fs = require('fs');
        ca = fs.readFileSync('ca-certificate-database.crt', 'utf8');
    }

    if (!user || !password || !host || !port || !ca) {
        throw new Error('Missing database connection information! Cannot create connection pool');
    }

    return new Pool({
        host,
        user,
        password,
        port,
        database: 'fpl',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        ssl: {
            ca,
        },
    });
};

export { createConnectionPool };
