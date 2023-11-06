const mongoose = require('mongoose');
const db = require('../config/db');
const AdminRegistrationModel = require('../models/admin_registration_model');
const ReportToBarangayModel = require('../models/report_to_barangay_model');
const { Schema } = mongoose;

const barangayResponseSchema = new Schema({
    responseVersion: {
        type: Number,
        default: 1, // Initial version
    },
    responseId: {
        type: String,
        required: true,
        unique: true
    },
    reportId: {
        type: Schema.Types.ObjectId,
        ref: ReportToBarangayModel.modelName
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: AdminRegistrationModel.modelName
    },
    sender: {
        type: String,
    },
    recipient: {
        type: String,
    },
    report_status: {
        type: String,
        required: [true, "This field is required"],
    },
    action_to_do: {
        type: String,
    },
    response_description: {
        type: String,
        required: [true, "This field is required"],
    },
    date_responded: {
        type: Date,
        default: Date.now,
    },
    uploaded_file: {
        type: [String],
    },
});

const BarangayResponseModel = db.model('barangay_response', barangayResponseSchema);

module.exports = BarangayResponseModel;
