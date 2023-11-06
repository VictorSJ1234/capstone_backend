const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const denguePostSchema = new Schema({
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
    details: {
        type: String,
        required: [true, "Post description is required"],
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const DenguePostModel = db.model('dengue-post', denguePostSchema);

module.exports = DenguePostModel;
