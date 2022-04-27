module.exports = function (req, res, next) {
    const data = {
        title: req.body.title,
        description: req.body.description,
        picture: req.body.encode,
        category: req.body.category,
        image_url: req.body.image_url
    }

    function validFile(url){
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

    if (req.path === "/projects"){
       
            if (!validFile(data.image_url)) {
                return res.status(401).json("Invalid URL");
            }
        
    }
    next();
}