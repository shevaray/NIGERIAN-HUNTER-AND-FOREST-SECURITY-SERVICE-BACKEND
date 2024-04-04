const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {   
        name: {
            type: String,
            minlength: 5,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            max: 100,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    },
    {timestamps: true}
)

const User = mongoose.model('User', userSchema)
module.exports = User