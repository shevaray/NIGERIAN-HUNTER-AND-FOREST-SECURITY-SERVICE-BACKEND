const express = require('express');
const Router = express.Router();
const Record = require('../core/models/record-model');
const ResponseStatus = require('../core/enum/response-status.enum');

Router.get('/', (req, res) => {
    Record.find().then((records) => { 
        res.status(200).json({
            status: ResponseStatus.OK,
            message: 'Records fetched successfully!',
            data: records
        })
    })
    .catch((error) => {
        res.status(400).send(error)
    })
})

Router.get('/:id', (req, res) => {
    Record.findById({ _id: req.params.id })
        .then((record) => {
            if (!record) {
                return res.status(404).json({
                    status: ResponseStatus.FAILED,
                    message: "Record not found!",
                    data: null
                })
            }

            return res.status(200).json({
                status: ResponseStatus.OK,
                message: "Record found succesfully!",
                data: record
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Internal server error",
            })
        })
})

Router.post('/', (req, res) => {
    const record = new Record(req.body)
    record.save()
        .then((record) => { 
            res.status(200).json({
                status: ResponseStatus.OK,
                message: 'Record created successfully!',
                data: record
            })
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

Router.put('/:id', (req, res) => {
    const updatedData = req.body;
    const recordID = req.params.id;

    Record.findByIdAndUpdate({_id: recordID}, updatedData)
        .then(() => { 
            res.status(200).json({
                status: ResponseStatus.OK,
                message: 'Record updated successfully!',
            })
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

Router.delete('/:id', (req, res) => {
    Record.findByIdAndDelete({ _id: req.params.id })
        .then((record) => {
            if (!record) {
                return res.status(404).json({
                    status: ResponseStatus.FAILED,
                    message: "Record not found!",
                    data: null
                })
            }

            return res.status(200).json({
                status: ResponseStatus.OK,
                message: "Record deleted succesfully!",
                data: record
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Internal server error",
            })
        })
})

module.exports = Router;
