const router = require('express').Router();
const client = require('../db-conn');
const authorize = require('../middleware/authorization');


//GET ALL PROJECTS
router.get('/', async (req, res) => {
    try {
        const project = await client.query("SELECT title, description, picture, category, image_url, id FROM projects")
                                
        res.json(project.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }})

//GET PROJECT BY ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const project = await client.query("SELECT id, title, description, picture, category, image_url FROM projects WHERE id = $1", [id]);

        res.json(project.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }})

    
//CREATE/POST A PROJECT
router.post('/', authorize, async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            description: req.body.description,
            picture: req.body.encode,
            category: req.body.category,
            image_url: req.body.image_url
        }

        const project = await client.query("INSERT INTO projects (title, description, picture, category, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *", [data.title, data.description, data.picture, data.category, data.image_url]);

        res.json(project.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

//DELETE PROJECTS
router.delete('/:id', authorize, async (req, res) => {
    try {
        const { id } = req.params;
        const project = await client.query("DELETE FROM projects WHERE id = $1", [id]);

        res.json(project.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

//UPDATE PROJECTS
router.put('/:id', authorize, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, picture, image_url, category } = req.body;

        const project = await client.query("UPDATE projects SET id = $1, title = $2, description = $3, picture = $4, image_url = $5 category = $6 WHERE id = $1 RETURNING *", [title, description, picture, image_url, category, id]);

        res.json(project.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;