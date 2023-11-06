const mongoose = require('mongoose');
const db = require('../config/db');
const UserModel = require('../models/user_information_model');
const reportModel = require('../models/user_report_model');
const { Schema } = mongoose;

const adminResponseSchema = new Schema({
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
        ref: UserModel.modelName
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: reportModel.modelName
    },
    responseId: {
        type: String,
        required: [true, "This field is required"],
        unique: true,
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

const AdminResponseModel = db.model('admin_response', adminResponseSchema);

module.exports = AdminResponseModel;
