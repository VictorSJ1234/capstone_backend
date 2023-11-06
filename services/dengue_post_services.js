const DenguePostModel = require('../models/dengue_post_model');

class DenguePostService {
    // Function to create a new admin report
    static async createDenguePost(project_title, project_date, project_time, uploaded_file, details, date_created) {
        try {
            const createPost = new DenguePostModel({
                project_title,
                project_date,
                project_time,
                uploaded_file,
                details,
                date_created
            });

            // Save the new report to the database
            return await createPost.save();
        } catch (error) {
            throw error;
        }
    }

     // Function to get user DenguePost by _id
     static async getDenguePost(_id) {
        // Retrieve user reports based on the userId
        const DenguePostsList = await DenguePostModel.find({ _id }).exec();
        return DenguePostsList;
    }

    // Function to get all DenguePosts
    static async getAllDenguePost() {
        try {
            // Retrieve all DenguePosts from the database
            const allDenguePosts = await DenguePostModel.find({}).exec();
            return allDenguePosts;
        } catch (error) {
            throw error;
        }
    }

    // Function to update DenguePosts by _id
    static async updatePost(_id, updatedData) {
        try {
            // Update the admin based on their _id with the new data from the controller
            await DenguePostModel.findByIdAndUpdate(_id, updatedData).exec();
        } catch (error) {
            throw error;
        }
    }

    // Function to delete a user report by its reportId
    static async deleteDenguePost(_id) {
        try {
            // Delete the report based on its reportId
            const deleteProject = await DenguePostModel.findOneAndDelete({ _id }).exec();
            return deleteProject;
        } catch (error) {
            throw error;
        }
    }

    // Function to get the latest posted dengue post
    static async getLatestDenguePost() {
        try {
            // Sort posts by date_created in descending order and return the first post
            const latestDenguePost = await DenguePostModel.findOne({}).sort({ date_created: -1 }).exec();
            return latestDenguePost;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = DenguePostService;
