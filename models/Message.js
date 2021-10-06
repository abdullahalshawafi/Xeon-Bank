const mongoose = require('mongoose');

const MessageModel = new mongoose.Schema({
    senderName: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageModel);