require('dotenv').config();

const { Client } = require('pg');
const { exec } = require('child_process');

const createDatabase = async () => {
    const client = new Client({
        user: process.env.DB_USER || 'your_user',
        host: process.env.DB_HOST || 'localhost',
        password: process.env.DB_PASSWORD || 'your_password',
        port: process.env.DB_PORT || 5432,
    });

    const databaseName = process.env.DB_NAME || 'your_database_name';
    const quotedDatabaseName = `"${databaseName}"`;

    try {
        await client.connect();

        // Check if the database exists
        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname='${databaseName}'`
        );

        if (res.rowCount === 0) {
            // Database does not exist, create it with quoted database name
            await client.query(`CREATE DATABASE ${quotedDatabaseName}`);
            console.log(`Database ${databaseName} created successfully.`);
        } else {
            console.log(`Database ${databaseName} already exists.`);
        }
    } catch (error) {
        console.error('Error creating the database:', error);
        throw error;
    } finally {
        await client.end();
    }
};

const migrate = () => {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'production') {
            // Run prisma migrate deploy in production
            console.log('Running migrations for production using prisma migrate deploy...');
            exec('npx prisma migrate deploy', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Migration error (deploy): ${error.message}`);
                    return reject(error);
                }
                if (stderr) {
                    console.error(`Migration stderr (deploy): ${stderr}`);
                    return reject(stderr);
                }
                console.log(`Migration stdout (deploy): ${stdout}`);
                resolve(stdout);
            });
        } else if (process.env.NODE_ENV === 'development') {
            // Run prisma migrate dev in development
            console.log('Running migrations for development using prisma migrate dev...');
            exec('npx prisma migrate dev --name migration', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Migration error (dev): ${error.message}`);
                    return reject(error);
                }
                if (stderr) {
                    console.error(`Migration stderr (dev): ${stderr}`);
                    return reject(stderr);
                }
                console.log(`Migration stdout (dev): ${stdout}`);
                resolve(stdout);
            });
        } else if (process.env.NODE_ENV === 'test') {
            // Run prisma migrate dev in test
            console.log('Running migrations for test using prisma db push...');
            exec('npx prisma db push', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Migration error (test): ${error.message}`);
                    return reject(error);
                }
                if (stderr) {
                    console.error(`Migration stderr (test): ${stderr}`);
                    return reject(stderr);
                }
                console.log(`Migration stdout (test): ${stdout}`);
                resolve(stdout);
            });
        } else {
            console.log('Unknown environment, skipping migrations.');
            resolve('Skipping migrations.');
        }
    });
};

module.exports = { createDatabase, migrate };
