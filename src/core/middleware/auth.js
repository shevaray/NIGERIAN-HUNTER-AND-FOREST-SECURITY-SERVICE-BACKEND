const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const Auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, 'hunterandforestsecurityservice');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) throw new Error()

        req.token = token;
        req.user = user;
    } catch (error) {
        res.status(401).json({
            message: 'You are not authorized, please authenticate!'
        })
    }
    next();
}

module.exports = Auth