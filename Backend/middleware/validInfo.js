module.exports = function (req, res, next) {

    const { username, password } = req.body;

    function validUsername(adminUsername) {
        return /^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/.test(adminUsername);
    }

    if (req.path === "/register") {

        console.log(!username.length);

        if (![username, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");

        } else if (!validUsername(username)) {
            return res.status(401).json("Invalid Username");

        }
    } else if (req.path === "/login") {

        if (![username, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");

        } else if (!validUsername(username)) {
            return res.status(401).json("Invalid Username");
        }
    }

    next();
};