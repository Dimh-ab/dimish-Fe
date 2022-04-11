const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'P0stGR3P@ss!',
    database: 'Portfolio_DB',
    host: 'localhost',
    port: 5432
});

module.exports = client;



