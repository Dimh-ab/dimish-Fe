const express = require('express');
const PORT = 4000;
const app = express();

app.use(express.json());

const db = require('./db');
const client = require('./db-conn');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//get admin
app.get('/api/admin', (req, res) => {
    db.getAdmin(req, res);
});

//get admin by id
app.get('/api/admin/:id', (req, res) => {
    db.getAdminID(req, res);
});

app.use("/api/auth", require("./routes/jwtAuth"));

app.use("/api/dashboard", require("./routes/dashboard"));

//port running on ...
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});