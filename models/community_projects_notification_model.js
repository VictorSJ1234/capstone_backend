const mongoose = require('mongoose');
const db = require('../config/db');
const UserModel = require('./user_information_model');
const CommunityProjectModel = require('./community_projects_model');
const { Schema } = mongoose;

const communityProjectNotificationSchema = new Schema({
    projectId: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
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


const communityProjectNotificationModel = db.model('community_project_notification', communityProjectNotificationSchema);

module.exports = communityProjectNotificationModel;
