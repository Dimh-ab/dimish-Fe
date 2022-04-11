const client = require('./db-conn');

client.connect();


const getAdmin = (req, res) => {
    client.query(`SELECT * FROM admin`, (error, result) => {
        if (error) {
            throw error
        }else {
            console.log(result.rows)
            res.status(200).json(result.rows)
        }
        client.end;
    })
}

const getAdminID = (req, res) => {
    client.query(`SELECT * FROM admin WHERE id=${req.params.id}`, (error, result) => {
        if (error) {
            throw error
        }else {
            console.log(result.rows)
            res.status(200).json(result.rows)
        }
        client.end;
    })
}



    module.exports = {
        getAdmin,
        getAdminID
    }