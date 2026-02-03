const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        address: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        }
    },

    {
        timestamps: true
    }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;