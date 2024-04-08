const mongoose = require('mongoose');
const validator = require('validator');

const recordSchema = new mongoose.Schema(
    {   
        firstname: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
        },
        othername: {
            type: String,
            trim: true,
        },
        phone_number: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            default: null,
            validate(value) {
                if ( value && !validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        dob: {
            type: String,
            required: true,
            trim: true
        },
        state_of_origin: {
            type: String,
            required: true,
            trim: true
        },
        lga_of_origin: {
            type: String,
            required: true,
            trim: true
        },
        state_of_residence: {
            type: String,
            required: true,
            trim: true
        },
        lga_of_residence: {
            type: String,
            required: true,
            trim: true
        },
        ward: {
            type: String,
            required: true,
            trim: true
        },
        department: {
            type: String,
            required: true,
            trim: true
        },
        rank: {
            type: String,
            trim: true,
            default: null
        },
        marital_status: {
            type: String,
            required: true,
            trim: true
        },
        religion: {
            type: String,
            required: true,
            trim: true
        },
        marital_status: {
            type: String,
            required: true,
            trim: true
        },
        nationality: {
            type: String,
            required: true,
            trim: true
        },
        qualification: {
            type: String,
            required: true,
            trim: true
        },
        other_qualification: {
            type: String,
            trim: true,
            default: null
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        },
        passport: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000000,
            validate(value) {
                if (!validator.isBase64(value, { urlSafe: false })) {
                    throw new Error('Please upload a base64 image')
                }
            }
        },

    },
    {timestamps: true}
)

const Record = mongoose.model('Record', recordSchema)
module.exports = Record