const router = require('express').Router();
const client = require('../db-conn');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');


//register route

router.post("/register", async (req, res) => {
    try {

        const { username, password } = req.body;
        const admin = await client.query("SELECT * FROM admin WHERE username = $1", [username]);

        if (admin.rows.length !== 0) {
            return res.status(401).send("Username already exists");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const hash = await bcrypt.hash(password, salt);

        const newAdmin = await client.query
            (`INSERT INTO admin (username, password) VALUES ($1, $2) RETURNING *`, [username, hash]);

        //res.json(newAdmin.rows[0]);

        const token = jwtGenerator(newAdmin.rows[0].id);

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

//login route

router.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body;

        const admin = await client.query("SELECT * FROM admin WHERE username = $1", [username]);

        if (admin.rows.length === 0) {
            return res.status(400).json("Username or password is incorrect");
        }

        const validPassword = await bcrypt.compare(password, admin.rows[0].password);

        if (!validPassword) {
            return res.status(400).json("Username or password is incorrect");
        }

        const token = jwtGenerator(admin.rows[0].id);

        res.json({token});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});






module.exports = router;