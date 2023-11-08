const BarangayResponseModel = require('../models/barangay_reponse_model');

class BaranagayResponseService {
    // Function to create a new admin report
    static async createBarangayReport(responseId, reportId, userId, sender, recipient, report_status, action_to_do, response_description, date_responded, uploaded_file) {
        try {
            // Find the latest version of the document with the provided reportId, - will fetch the latest version, because it means descending
            const latestVersion = await BarangayResponseModel.findOne({ reportId }).sort({ responseVersion: -1 });
    
            // Calculate the next version number, if the latestVersion exist add 1, if not the latest version will just be 1
            const nextVersion = latestVersion ? latestVersion.responseVersion + 1 : 1;
    
            // Create a new admin report document with the provided data and version number
            const createReport = new BarangayResponseModel({
                responseId,
                reportId,
                userId,
                sender,
                recipient,
                report_status,
                action_to_do,
                response_description,
                date_responded,
                responseVersion: nextVersion,
                uploaded_file
            });
    
            // Save the new report to the database
            return await createReport.save();
        } catch (error) {
            throw error;
        }
    }
    

    // Function to get admin response by reportId
    static async getBarangayResponse(reportId) {
        try {
            // Retrieve admin response based on the reportId
            return await BarangayResponseModel.find({ reportId }).exec();
        } catch (error) {
            throw error;
        }
    }

    // Function to delete admin response by reportId
    static async deleteBarangayResponse(reportId) {
        try {
            // Delete admin responses based on the reportId
            return await BarangayResponseModel.deleteMany({ reportId });
        } catch (error) {
            throw error;
        }
    }


}

module.exports = BaranagayResponseService;
