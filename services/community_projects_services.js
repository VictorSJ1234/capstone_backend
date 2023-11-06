const CommunityProjectModel = require('../models/community_projects_model');

class ConmmunityProjectsService {
    // Function to create a new admin report
    static async createCommunityProject(project_title, project_date, project_time, uploaded_file, type_of_project, location, details, date_created) {
        try {
            const createProject = new CommunityProjectModel({
                project_title,
                project_date,
                project_time,
                uploaded_file,
                type_of_project,
                location,
                details,
                date_created
            });

            // Save the new report to the database
            return await createProject.save();
        } catch (error) {
            throw error;
        }
    }

     // Function to get user community project by _id
     static async getCommunityProject(_id) {
        // Retrieve user reports based on the userId
        const communityProjectsList = await CommunityProjectModel.find({ _id }).exec();
        return communityProjectsList;
    }

    // Function to get all community projects
    static async getAllCommunityProjects() {
        try {
            // Retrieve all community projects from the database
            const allCommunityProjects = await CommunityProjectModel.find({}).exec();
            return allCommunityProjects;
        } catch (error) {
            throw error;
        }
    }

    // Function to update community projects by _id
    static async updateProject(_id, updatedData) {
        try {
            // Update the admin based on their _id with the new data from the controller
            await CommunityProjectModel.findByIdAndUpdate(_id, updatedData).exec();
        } catch (error) {
            throw error;
        }
    }

    // Function to delete a user report by its reportId
    static async deleteCommunityProject(_id) {
        try {
            // Delete the report based on its reportId
            const deleteProject = await CommunityProjectModel.findOneAndDelete({ _id }).exec();
            return deleteProject;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ConmmunityProjectsService;
