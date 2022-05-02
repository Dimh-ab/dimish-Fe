module.exports = function (req, res, next) {
    const data = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image_url: req.body.image_url
    }

    const id = req.params.id;

    function validFile(url){
        return /^data:image\/(?:gif|png|jpeg|jpg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/g.test(url);
    }

    if (req.path === "/"){
          
        if (![data.title, data.description, data.category, data.image_url].every(Boolean)) {
            return res.status(401).json("Missing Credentials");

        } else if (!validFile(data.image_url)) {
            return res.status(401).json("Invalid File");
        }
        
    } else if (req.path === `/${id}`){

        if (![data.title, data.description, data.category, data.image_url].every(Boolean)) {
            return res.status(401).json("Missing Credentials");

        } else if (!validFile(data.image_url)) {
            return res.status(401).json("Invalid File");
        }

    }

    next();
}