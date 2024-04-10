const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {   
        username: {
            type: String,
            minlength: 5,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate(value) {
                if (value && !validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    },
    { timestamps: true },
)

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.__v

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'hunterandforestsecurityservice');
    user.tokens = user.tokens.concat({ token });
    await user.save()
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user
}

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified('password'))  user.password = await bcrypt.hash(user.password, 8);
    next();
})

const User = mongoose.model('User', userSchema)
module.exports = User