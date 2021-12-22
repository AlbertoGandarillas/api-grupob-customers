const {Customer, Document} = require('../models')

class CustomerController {

    static create(req,res) {
        let payload =req.body
        Customer.create(payload)
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
        Customer.findAll({
            include: {model: Document, as: 'DocumentData'}
        })
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
        Customer.findbypk(pk)
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
        Customer.update(payload, {where: {id:pk}} )
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
        Customer.destroy({where: {id:pk}})
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
    
module.exports = {CustomerController}