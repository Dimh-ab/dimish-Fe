const router = require('express').Router();
const client = require('../db-conn');
const authorize = require('../middleware/authorization');

//CREATE/POST A PROJECT
router.post('/create', authorize, async (req, res) => {
    try {
        const { title, description, picture, category } = req.body;

        const project = await client.query("INSERT INTO projects (title, description, picture, category) VALUES ($1, $2, $3, $4) RETURNING *", [title, description, picture, category]);

        res.json(project.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }}
)


//GET ALL PROJECTS
router.get('/', async (req, res) => {
    try {
        const project = await client.query("SELECT title, description, picture, category FROM projects");

        res.json(project.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }})

//GET PROJECT BY ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const project = await client.query("SELECT title, description, picture, category FROM projects WHERE id = $1", [id]);

        res.json(project.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }})

//DELETE PROJECTS
router.delete('/:id', authorize, async (req, res) => {
    try {
        const { id } = req.params;
        const project = await client.query("DELETE FROM projects WHERE id = $1", [id]);

        res.json(project.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }})

//UPDATE PROJECTS
router.put('/:id', authorize, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, picture, category } = req.body;

        const project = await client.query("UPDATE projects SET title = $1, description = $2, picture = $3, category = $4 WHERE id = $5 RETURNING *", [title, description, picture, category, id]);

        res.json(project.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }})


module.exports = router;