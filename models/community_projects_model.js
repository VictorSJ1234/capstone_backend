const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const communityProjectSchema = new Schema({
    project_title: {
        type: String,
        required: [true, "Project title is required"],
    },
    project_date: {
        type: String,
        required: [true, "This field is required"],
    },
    project_time: {
        type: String,
        required: [true, "Project time is required"],
    },
    uploaded_file: {
        type: String,
    },
    type_of_project: {
        type: String,
        required: [true, "Attachment description is required"],
    },
    location: {
        type: String,
        required: [true, "Post description is required"],
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

const CommunityProjectModel = db.model('community-projects-post', communityProjectSchema);

module.exports = CommunityProjectModel;
