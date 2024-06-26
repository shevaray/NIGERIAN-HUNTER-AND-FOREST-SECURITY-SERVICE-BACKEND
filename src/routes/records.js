const express = require('express');
const Router = express.Router();
const ResponseStatus = require('../core/enum/response-status.enum');
const Record = require('../core/models/record-model');
const Auth = require('../core/middleware/auth');

Router.get('/', Auth, async (req, res) => {
    if (!req.user) false;

    const page = parseInt(req.query.page) || 1;
    const page_size = parseInt(req.query.page_size) || 10;
    const from = (page - 1) * page_size;
    const to = page * page_size;
    const next_page = { page: page + 1, page_size: page_size };
    const previous_page = { page: page - 1, page_size: page_size };
    const results = {};

    try {
        results.data = await Record.find({}).limit(page_size).skip(from).sort({updatedAt: 'desc'}).exec();
        results.total = await Record.countDocuments().exec();
        if (to < results.total) next_page;
        if (from > 0) previous_page;
        results.current_page = page;
        results.page_size = page_size;
        results.from = from;
        results.to = to;
        
        res.status(200).json({
            status: ResponseStatus.OK,
            message: 'Records fetched successfully!',
            data: results
        })
        
    } catch (error) {
        res.status(500).send()
    }

})

Router.get('/:id', Auth, async (req, res) => {
    if (!req.user) return;

    try {
        const record = await Record.findOne({ _id: req.params.id });
        
        if (!record) {
            return res.status(404).json({
                status: ResponseStatus.FAILED,
                message: "Record not found!",
                data: null
            })
        }

        res.status(200).json({
            status: ResponseStatus.OK,
            message: "Record found succesfully!",
            data: record
        })

    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                status: ResponseStatus.FAILED,
                message: "Record not found!",
                data: null
            })
        }

        res.status(500).json({
            message: "Service unavailable!, please try again",
        })
    }
})

Router.post('/', Auth, async (req, res) => {
    if (!req.user) return;

    try {
        const record = new Record(req.body);
        await record.save()
        res.status(201).json({
            status: ResponseStatus.OK,
            message: 'Record created successfully!',
            data: record
        })

    } catch (error) {
        if (error.errors.passport) return res.status(400).json({
            status: ResponseStatus.FAILED,
            message: error.errors.passport.message
        })
        
        res.status(500).json({
            message: "Service unavailable!, please try again"
        })
    }
})

Router.put('/:id', Auth, async (req, res) => {
    if (!req.user) return;

    try {
        const record = await Record.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true});
        if (!record) {
            return res.status(404).json({
                data: null,
                status: ResponseStatus.FAILED,
                message: "Record not found!"
            })
        }

        res.status(200).json({
            status: ResponseStatus.OK,
            message: 'Record updated successfully!',
            data: record
        })

    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                data: null,
                status: ResponseStatus.FAILED,
                message: "Record not found!"
            })
        }

        res.status(500).json({
            message: "Service unavailable!, please try again"
        })
    }
})

Router.delete('/:id', Auth, async (req, res) => {
    if (!req.user) return;

    try {
        const record = await Record.findByIdAndDelete({ _id: req.params.id });
        
        if (!record) {
            return res.status(404).json({
                status: ResponseStatus.FAILED,
                message: "Record not found!",
                data: null
            })
        }
        
        res.status(200).json({
            status: ResponseStatus.OK,
            message: "Record deleted succesfully!",
            data: record
        })

    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                status: ResponseStatus.FAILED,
                message: "Record not found!",
                data: null
            })
        }

        res.status(500).json({
            message: "Service unavailable!, please try again",
        })
    }
})

module.exports = Router;
