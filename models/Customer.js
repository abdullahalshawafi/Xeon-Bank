const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthdate: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    nationalId: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        default: 0.00
    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);