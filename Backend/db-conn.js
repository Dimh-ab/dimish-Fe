const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'liaStudent',
    database: 'portfolio_db',
    host: 'localhost',
    port: 5000
});

client.connect();

module.exports = client;



