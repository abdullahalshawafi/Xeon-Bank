const mongoose = require('mongoose');

const TransferModel = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Transfer', TransferModel);