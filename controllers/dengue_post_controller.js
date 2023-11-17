const DenguePostService = require('../services/dengue_post_services'); 
const DenguePostModel = require('../models/dengue_post_model');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');

// Create a new community report
exports.createDenguePost = async (req, res, next) => {
    try {
        const { project_title, project_date, project_time, uploaded_file, details, date_created } = req.body;

        // Encrypt sensitive data
        //const encryptedProjectTitle = encryptData(project_title);
        //const encryptedPostDescription = encryptData(details);
        //const encryptedProjectDate = encryptData(project_date);
        //const encryptedProjectTime = encryptData(project_time);
        //const encryptedUploadedFile = encryptData(uploaded_file);

        const dateCreated = date_created ? new Date(date_created) : new Date();

        // Data to be transferred to the database
        const denguePostData = await DenguePostService.createDenguePost(
            project_title,
            project_date,
            project_time,
            uploaded_file,
            details,
            dateCreated
        );

        res.json({ status: true, success: "DenguePost Created Successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


// get user report
exports.getDenguePost = async (req, res, next) => {
    try {
        const { _id } = req.body;

        const denguePostData = await DenguePostService.getDenguePost(_id);

        if (denguePostData.length === 0) {
            // No reports found for the user, return an empty array
            res.json({ status: true, denguePostData: [] });
            return;
        }

        // Decrypt the sensitive data for each report
        const decryptedDenguePostData = denguePostData.map(denguePost => {
            //const decryptedProjectTitle = decryptData(denguePost.project_title);
            //const decryptedProjectDate = decryptData(denguePost.project_date);
            //const decryptedProjectTime = decryptData(denguePost.project_time);
            //const decryptedUploadedFile = decryptData(denguePost.uploaded_file);
            //const decryptedPostDescription = decryptData(denguePost.details);

            return {
                _id: denguePost._id,
                project_title: denguePost.project_title,
                project_date: denguePost.project_date,
                project_time: denguePost.project_time,
                uploaded_file: denguePost.uploaded_file,
                details: denguePost.details,
                date_created: denguePost.date_created
            };
        });

        res.json({ status: true, denguePostData: decryptedDenguePostData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// Get all DenguePost data
exports.getAllDenguePost = async (req, res, next) => {
    try {
        const allDenguePost = await DenguePostService.getAllDenguePost();

        if (allDenguePost.length === 0) {
            // No DenguePosts found, return an empty array
            res.json({ status: true, denguePostData: [] });
            return;
        }

        // Decrypt the sensitive data for each DenguePost
        const decryptedDenguePostData = allDenguePost.map(denguePost => {
           // const decryptedProjectTitle = decryptData(denguePost.project_title);
            //const decryptedProjectDate = decryptData(denguePost.project_date);
            //const decryptedProjectTime = decryptData(denguePost.project_time);
            //const decryptedUploadedFile = decryptData(denguePost.uploaded_file);
           // const decryptedPostDescription = decryptData(denguePost.details);

            return {
                _id: denguePost._id,
                project_title: denguePost.project_title,
                project_date: denguePost.project_date,
                project_time: denguePost.project_time,
                uploaded_file: denguePost.uploaded_file,
                details: denguePost.details,
                date_created: denguePost.date_created
            };
        });

        res.json({ status: true, denguePostData: decryptedDenguePostData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

//edit denguePost
exports.editPost = async (req, res, next) => {
    try {
        const { _id } = req.params; // Get the admin's _id from the frontend
        console.log('_id:', _id); 
        const { project_title, project_date, project_time, uploaded_file, details} = req.body;

        // Encrypt the updated data
        const updatedData = {
            project_title: project_title,
            project_date: project_date,
            project_time: project_time,
            uploaded_file: uploaded_file,
            details: details,
        };

        console.log('updatedData:', updatedData);

        // Update the admin account in the database
        await DenguePostService.updatePost(_id, updatedData);

        res.json({ status: true, success: "Admin account updated successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.deleteDenguePost = async (req, res, next) => {
    try {
        const { _id } = req.body;

        // Perform the deletion operation
        const deleteProject = await DenguePostService.deleteDenguePost(_id);

        if (!deleteProject) {
            // Cannot find the requested report to delete
            return res.status(404).json({ error: "REPORT_NOT_FOUND", message: 'Report not found' });
        }

        res.json({ status: true, success: "project deleted successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// Get the latest posted dengue post
exports.getLatestDenguePost = async (req, res, next) => {
    try {
        const latestDenguePost = await DenguePostService.getLatestDenguePost();

        if (!latestDenguePost) {
            // No dengue post found
            res.json({ status: true, latestDenguePost: null });
        }

        // Decrypt the sensitive data for the latest post
        const decryptedLatestDenguePost = {
            _id: latestDenguePost._id,
            project_title: latestDenguePost.project_title,
            project_date: latestDenguePost.project_date,
            project_time: latestDenguePost.project_time,
            uploaded_file: latestDenguePost.uploaded_file,
            details: latestDenguePost.details,
            date_created: latestDenguePost.date_created
        };

        res.json({ status: true, latestDenguePost: decryptedLatestDenguePost });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};
