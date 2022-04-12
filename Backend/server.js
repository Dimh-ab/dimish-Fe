const express = require('express');
const PORT = 4000;
const app = express();
const cors = require('cors');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/public'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
    });
  }

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the backend'
    })
});

app.use('/api/projects', require('./routes/projects'));

app.use("/api/auth", require("./routes/jwtAuth"));

app.use("/api/dashboard", require("./routes/dashboard"));

//port running on ...
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});