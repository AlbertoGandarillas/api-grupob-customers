const {Document} = require('../models')

class DocumentController {

    static create(req,res) {
        let payload =req.body
        Document.create(payload)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.status(400).send({
                    "message": err.message
                })
            })
    }

    static findAll(req,res) {
        Document.findAll()
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
        Document.findbypk(pk)
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
        Document.update(payload, {where: {id:pk}} )
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
        Document.destroy({where: {id:pk}})
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
    
module.exports = {DocumentController}