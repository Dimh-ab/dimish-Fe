const router = require("express").Router();
const client = require("../db-conn");
const authorize = require("../middleware/authorization");

router.get("/", authorize, async (req, res) => {

    try {

        //res.json(req.admin);
        const admin = await client.query("SELECT username FROM admin WHERE id = $1", [req.admin]);

        res.json(admin.rows[0]);


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

module.exports = router;