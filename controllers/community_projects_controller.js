const ConmmunityProjectsService = require('../services/community_projects_services'); 
const CommunityProjectModel = require('../models/community_projects_model');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');

// Create a new community report
exports.createCommunityProject = async (req, res, next) => {
    try {
        const { project_title, project_date, project_time, uploaded_file, type_of_project,location, details, date_created } = req.body;

        const dateCreated = date_created ? new Date(date_created) : new Date();

        // Data to be transferred to the database
        const communityProjectsData = await ConmmunityProjectsService.createCommunityProject(
            project_title,
            project_date,
            project_time,
            uploaded_file,
            type_of_project,
            location,
            details,
            dateCreated
        );

        res.json({ status: true, success: "Community Project Created Successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};



// get user report
exports.getCommunityProject = async (req, res, next) => {
    try {
        const { _id } = req.body;

        const communityProjectsData = await ConmmunityProjectsService.getCommunityProject(_id);

        if (communityProjectsData.length === 0) {
            // No reports found for the user, return an empty array
            res.json({ status: true, communityProjectsData: [] });
            return;
        }
        res.json({ status: true, communityProjectsData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// Get all community project data
exports.getAllCommunityProjects = async (req, res, next) => {
    try {
        const allCommunityProjects = await ConmmunityProjectsService.getAllCommunityProjects();

        if (allCommunityProjects.length === 0) {
            // No community projects found, return an empty array
            res.json({ status: true, communityProjectsData: [] });
            return;
        }

        // Sort projects by creation date in descending order
        allCommunityProjects.sort((a, b) => b.date_created - a.date_created);

        res.json({ status: true, communityProjectsData: allCommunityProjects });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


//edit communityProject
exports.editProject = async (req, res, next) => {
    try {
        const { _id } = req.params;
        console.log('_id:', _id); 
        const { project_title, project_date, project_time, uploaded_file, type_of_project, location, details} = req.body;


        const updatedData = {
            project_title, 
            project_date, 
            project_time, 
            uploaded_file, 
            type_of_project, 
            location,
            details, 
        };

        console.log('updatedData:', updatedData);

        // Update the admin account in the database
        await ConmmunityProjectsService.updateProject(_id, updatedData);

        res.json({ status: true, success: "Admin account updated successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.deleteCommunityProject = async (req, res, next) => {
    try {
        const { _id } = req.body;

        // Perform the deletion operation
        const deleteProject = await ConmmunityProjectsService.deleteCommunityProject(_id);

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