const router = require('express').Router();
const client = require('../db-conn');
const authorize = require('../middleware/authorization');
const validForm = require('../middleware/validForm');


//GET ALL PROJECTS
router.get('/', async (req, res) => {
    try {
        const project = await client.query("SELECT title, description, category, image_url, id FROM projects") 
                                    
        res.json(project.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }})

//GET PROJECT BY ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const project = await client.query("SELECT title, description, category, id, image_url FROM projects WHERE id = $1", [id]);

        res.json(project.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }})

    
//CREATE/POST A PROJECT
router.post('/', authorize, validForm, async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            image_url: req.body.image_url
        }

        const project = await client.query("INSERT INTO projects (title, description, category, image_url) VALUES ($1, $2, $3, $4) RETURNING *", [data.title, data.description, data.category, data.image_url]);

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
router.put('/:id', authorize, validForm, async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            image_url: req.body.image_url,
            id: req.params.id
        }

        const project = await client.query("UPDATE projects SET title = $1, description = $2, image_url = $3, category = $4 WHERE id = $5 RETURNING *", [data.title, data.description, data.image_url, data.category, data.id]);

        res.json(project.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;