const AdminResponseModel = require('../models/admin_response_model');

class AdminResponseService {
    // Function to create a new admin report
    static async createAdminReport(responseId, reportId, userId, report_status, action_to_do, response_description, date_responded, uploaded_file) {
        try {
            // Find the latest version of the document with the provided reportId, - will fetch the latest version, because it means descending
            const latestVersion = await AdminResponseModel.findOne({ reportId }).sort({ responseVersion: -1 });
    
            // Calculate the next version number, if the latestVersion exist add 1, if not the latest version will just be 1
            const nextVersion = latestVersion ? latestVersion.responseVersion + 1 : 1;
    
            // Create a new admin report document with the provided data and version number
            const createReport = new AdminResponseModel({
                responseId,
                reportId,
                userId,
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
    static async getAdminResponse(reportId) {
        try {
            // Retrieve admin response based on the reportId
            return await AdminResponseModel.find({ reportId }).exec();
        } catch (error) {
            throw error;
        }
    }


    // Add other functions for handling admin reports (e.g., getAdminReport, getAllAdminReportData, deleteAdminReport, etc.)
}

module.exports = AdminResponseService;
