const mongoose = require('mongoose');

const TransactionModel = new mongoose.Schema({
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

module.exports = mongoose.model('Transaction', TransactionModel);