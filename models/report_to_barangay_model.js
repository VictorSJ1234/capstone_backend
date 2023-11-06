const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const reportToBarangaySchema = new Schema({
    reportId: {
        type: String,
        required: true,
        unique: true
    },
    report_number: {
        type: String,
        required: [true, "Project title is required"],
    },
    barangay: {
        type: String,
        required: [true, "This field is required"],
    },
    status: {
        type: String,
        required: [true, "Project time is required"],
    },
    report_subject: {
        type: String,
        required: [true, "Project time is required"],
    },
    uploaded_file: {
        type: [String],
    },
    details: {
        type: String,
        required: [true, "Post description is required"],
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const ReportToBarangayModel = db.model('report-to-barangay', reportToBarangaySchema);

module.exports = ReportToBarangayModel;
