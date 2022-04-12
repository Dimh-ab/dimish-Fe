const express = require('express');
const PORT = 4000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//CRUD ROUTES
app.use('/api/projects', require('./routes/projects'));

app.use("/api/auth", require("./routes/jwtAuth"));

app.use("/api/dashboard", require("./routes/dashboard"));

//port running on ...
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});