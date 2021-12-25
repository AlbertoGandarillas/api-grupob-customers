const {User} = require('../models')
const bcrypt = require('bcrypt')

class AuthController {
    static login(req, res) {
        let username = req.body.username
        let password = req.body.password
        User.findAll({where: {username: username}})
        .then((users) => {
            let user = users[0]
            bcrypt.compare(password, user.password,(err, result) => {
                if (result == true) {
                    res.status = 200                    
                    res.send("Authorized")
                } else {
                    let err = new Error("Unauthorized")
                    err.status = 401
                    res.status(401).send({
                        message: err.message
                    })
                }
            })
        })
        .catch((err) => {
            res.status(401).send({
                message: err.message
            })
        })
    }
}

module.exports = {AuthController}