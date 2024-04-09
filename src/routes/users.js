const express = require('express');
const Router = express.Router();
const ResponseStatus = require('../core/enum/response-status.enum');
const User = require('../core/models/user-model');
const Auth = require('../core/middleware/auth');

Router.get('/', Auth, async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({
            status: ResponseStatus.OK,
            message: 'User profile fetched successfully!',
            data: user
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

Router.get('/profile', Auth, async (req, res) => {
    res.status(200).json({
        status: ResponseStatus.OK,
        message: 'Users fetched successfully!',
        data: req.user
    })
})

Router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        res.status(200).json({
            status: ResponseStatus.OK,
            message: "User found succesfully!",
            data: user
        })

    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                status: ResponseStatus.FAILED,
                message: "User not found!",
                data: null
            })
        }

        res.status(500).json({
            message: "Internal server error",
        })
    }
})

Router.post('/', async (req, res) => {
    try {
        const user = await new User(req.body).save();
        res.status(200).json({
            status: ResponseStatus.OK,
            message: 'User created successfully!',
            data: user
        })
    } catch (error) {
        res.status(400).send(error)
    }

})

Router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()

        if (!user) return res.status(400).json({
            status: ResponseStatus.FAILED,
            message: "Invalid Email or Password",
            data: user
        })

        res.status(200).json({
            status: ResponseStatus.OK,
            message: "Login succesfully!",
            data: {user, token}
        })
    } catch (error) {
        res.status(400).send(error);
    }
}) 

Router.put('/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));


    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid updates!" });
    }

    try {
        const user = await User.findById(_id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save()

        res.status(200).json({
            status: ResponseStatus.OK,
            message: 'User updated successfully!',
            data: user
        })

    } catch (error) {
        res.status(400).send(error)
    }
})

Router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        await User.findByIdAndDelete(_id);
        res.status(200).json({
            status: ResponseStatus.OK,
            message: "User deleted succesfully!",
        })

    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                status: ResponseStatus.FAILED,
                message: "User not found!",
                data: null
            })
        }

        res.status(500).json({
            message: "Internal server error",
        })
    }
})

module.exports = Router;