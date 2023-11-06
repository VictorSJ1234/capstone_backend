const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const inquirySchema = new Schema({
    email: {
        type: String,
        required: [true, "Project title is required"],
    },
    subject: {
        type: String,
        required: [true, "This field is required"],
    },
    uploaded_file: {
        type: [String],
    },
    inquiry: {
        type: String,
        required: [true, "Attachment description is required"],
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const InquiryModel = db.model('inquiries', inquirySchema);

module.exports = InquiryModel;
