const router = require('express').Router();
const client = require('../db-conn');
const authorize = require('../middleware/authorization');
// const multer = require("multer");
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: './images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
//   })
  
//   const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024*1024*10
//     }
//   })


//GET ALL PROJECTS
router.get('/', async (req, res) => {
    try {
        const project = await client.query("SELECT title, description, picture, category, image_url FROM projects")
       
            // project.rows.map(p => {
            //     if( Buffer.isBuffer(p.picture)) {
            //         const b64 = Buffer.from(p.picture).toString('base64');
            //         p.picture = b64
            //     }
            // })
        
                                    
        res.json(project.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }})

//GET PROJECT BY ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const project = await client.query("SELECT title, description, picture, category, FROM projects WHERE id = $1", [id]);

        res.json(project.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }})

    
//CREATE/POST A PROJECT
router.post('/', authorize, async (req, res) => {
    try {
        // console.log(req.body.encode);
        // console.log(req.file.filename);
        const data = {
            title: req.body.title,
            description: req.body.description,
            picture: req.body.encode,
            category: req.body.category,
            image_url: req.body.image_url
        }
        // const { title, description, category } = req.body;
        // const picture = req.file.filename;

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
        const { title, description, picture, category } = req.body;

        const project = await client.query("UPDATE projects SET title = $1, description = $2, picture = $3, category = $4 WHERE id = $5 RETURNING *", [title, description, picture, category, id]);

        res.json(project.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;