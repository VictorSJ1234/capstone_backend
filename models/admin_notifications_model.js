const mongoose = require('mongoose');
const db = require('../config/db');
const AdminRegistrationModel = require('./admin_registration_model');
const CommunityProjectModel = require('./community_projects_model');
const { Schema } = mongoose;

const adminNotificationSchema = new Schema({
    projectId: {
        type: String,
    },
    userId: {
        type: String,
    },
    adminId: {
        type: String,
    },
    recipient: {
        type: String,
    },
    reportId: {
        type: String,
    },
    title: {
        type: String,
    },
    message: {
        type: String,
    },
    notificationStatus: {
        type: String,
        required: [true, "This field is required"],
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});


const adminNotificationModel = db.model('admin_notification', adminNotificationSchema);

module.exports = adminNotificationModel;
