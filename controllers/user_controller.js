const {User} = require('../models')
const bcrypt = require('bcrypt')

class UserController {

    static createSync(req,res) {
        let payload =req.body
        const salt = bcrypt.genSaltSync(10)
        let newPassword = bcrypt.hashSync(payload.password,salt)
        payload.password = newPassword
        User.create(payload)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.status(400).send({
                    "message": err.message
                })
            })
    }

    static create(req,res) {
        let payload =req.body
        const salt = bcrypt.genSalt(15,(err,salt) => {
            bcrypt.hash(payload.password, salt, (err,hash) => {
                payload.password = hash;
                User.create(payload).then((data) => {
                    res.send(data)
                })
                .catch((err) => {
                    res.status(400).send({
                        "message": err.message
                    })
                })
            })
        })
    }

    static findAll(req,res) {
        User.findAll()
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.status(404).send({
                    "message": err.message
                })
            })
    }

    static findOne(req,res) {
        let pk = req.params.id
        User.findbypk(pk)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.status(404).send({
                    "message": err.message
                })
            })
    }

    static update(req,res) {
        let payload =req.body
        let pk = req.params.id
        User.update(payload, {where: {id:pk}} )
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.status(400).send({
                    "message": err.message
                })
            })
    }

    static destroy(req,res) {
        let pk = req.params.id
        User.destroy({where: {id:pk}})
            .then((data) => {
                res.status(200).send("DELETED")
            })
            .catch((err) => {
                res.status(400).send({
                    "message": err.message
                })
            })
    }

}
    
module.exports = {UserController}