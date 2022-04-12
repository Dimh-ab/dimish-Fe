const jwt = require('jsonwebtoken');
require("dotenv").config();


module.exports = async (req, res, next) => {

    const jwtToken = req.header('token');


    if (!jwtToken) {
        return res.status(403).json({ msg: "authorization denied" });
    }

    try {

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.admin = payload.admin;

        next();

    } catch (error) {
        console.error(error.message);
        return res.status(404).json({ msg: "Token is not valid" });
    }

};
