const { Client } = require('pg');

const db = new Client({
    host: 'starpets.host',
    port: 5432,
    database: 'starpets',
    user: 'postgres',
    password: 'password',
});

db.connect();

async function migrate() {
    const migration = `
    DROP TABLE IF EXISTS user_balance;
    CREATE TABLE user_balance (
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE,
        balance INT NOT NULL
    );
    INSERT INTO user_balance (id, user_id, balance) VALUES (1,1,10000);
    `;

    const res = await db.query(migration);
    console.log(res);
}

/**
 * In normal app we should have table with migrations in a database.
 * We will keep the game simple.
 */
(async () => {
    await migrate();
})();

module.exports = { db, migrate };