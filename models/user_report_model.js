const mongoose = require('mongoose');
const db = require('../config/db');
const UserModel = require('../models/user_information_model');
const { Schema } = mongoose;

const userReportSchema = new Schema({
    //to connect the userId to to created report
    reportId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    report_number: {
        type: String,
        required: [true, "This field is required"],
    },
    barangay: {
        type: String,
        required: [true, "This field is required"],
    },
    report_type: {
        type: String,
    },
    report_subject: {
        type: String,
        required: [true, "This field is required"],
    },
    uploaded_file: {
        type: [String],
    },
    report_description: {
        type: String,
        required: [true, "This field is required"],
    },   
    postedDate: { 
        type: Date,
        default: Date.now 
    },
    report_status: {
        type: String,
        required: [true, "This field is required"],
    },
});


const UserReportModel = db.model('user_report', userReportSchema);

module.exports = UserReportModel;
