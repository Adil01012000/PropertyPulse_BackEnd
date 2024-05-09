const mongoose = require('mongoose');
const crypto = require('crypto');

const contactUsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);
module.exports = ContactUs;
