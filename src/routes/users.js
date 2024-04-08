const express = require('express');
const Router = express.Router();
const ResponseStatus = require('../core/enum/response-status.enum');
const User = require('../core/models/user-model');


Router.get('/', (req, res) => {
    User.find().then((user) => { 
        res.status(200).json({
            status: ResponseStatus.OK,
            message: 'Users fetched successfully!',
            data: user
        })
    })
    .catch((error) => {
        res.status(400).send(error)
    })
})

Router.get('/:id', (req, res) => {
    User.findById({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    status: ResponseStatus.FAILED,
                    message: "User not found!",
                    data: null
                })
            }

            return res.status(200).json({
                status: ResponseStatus.OK,
                message: "User found succesfully!",
                data: user
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Internal server error",
            })
        })
})

Router.post('/', (req, res) => {
    const user = new User(req.body)

    user.save()
        .then((user) => { 
            res.status(200).json({
                status: ResponseStatus.OK,
                message: 'User created successfully!',
                data: user
            })
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

Router.put('/:id', (req, res) => {
    const updatedData = req.body;
    const userID = req.params.id;

    User.findByIdAndUpdate({_id: userID}, updatedData)
        .then((user) => { 
            res.status(200).json({
                status: ResponseStatus.OK,
                message: 'User updated successfully!',
            })
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

Router.delete('/:id', (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    status: ResponseStatus.FAILED,
                    message: "User not found!",
                    data: null
                })
            }

            return res.status(200).json({
                status: ResponseStatus.OK,
                message: "User deleted succesfully!",
                data: user
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Internal server error",
            })
        })
})

module.exports = Router;