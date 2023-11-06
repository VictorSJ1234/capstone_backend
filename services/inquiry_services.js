const InquiryModel = require('../models/inquiry_model');

class InquiryService {
    // Function to create a new admin report
    static async createInquiry(email, subject, uploaded_file, inquiry, date_created) {
        try {
            const createProject = new InquiryModel({
                email, subject, uploaded_file, inquiry, date_created
            });

            // Save the new report to the database
            return await createProject.save();
        } catch (error) {
            throw error;
        }
    }

     // Function to get user community project by _id
     static async getInquiry(_id) {
        // Retrieve user reports based on the userId
        const inquiryList = await InquiryModel.find({ _id }).exec();
        return inquiryList;
    }

    // Function to get all community projects
    static async getAllInquiry() {
        try {
            // Retrieve all community projects from the database
            const allInquiry = await InquiryModel.find({}).exec();
            return allInquiry;
        } catch (error) {
            throw error;
        }
    }

    // Function to delete a user report by its reportId
    static async deleteInquiry(_id) {
        try {
            // Delete the report based on its reportId
            const deleteProject = await InquiryModel.findOneAndDelete({ _id }).exec();
            return deleteProject;
        } catch (error) {
            throw error;
        }
    }

    static async getTotalUserInquiryCount() {
        try {
            const totalCount = await InquiryModel.countDocuments().exec();
            return totalCount;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = InquiryService;
