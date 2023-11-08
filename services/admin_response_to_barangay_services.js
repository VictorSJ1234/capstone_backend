const AdminResponseToBarangayModel = require('../models/admin_response_to_barangay_model');

class AdminResponseToBarangayService {
    // Function to create a new admin report
    static async createAdminReport(responseId, reportId, userId, sender, recipient, report_status, action_to_do, response_description, date_responded, uploaded_file) {
        try {
            // Find the latest version of the document with the provided reportId, - will fetch the latest version, because it means descending
            const latestVersion = await AdminResponseToBarangayModel.findOne({ reportId }).sort({ responseVersion: -1 });
    
            // Calculate the next version number, if the latestVersion exist add 1, if not the latest version will just be 1
            const nextVersion = latestVersion ? latestVersion.responseVersion + 1 : 1;
    
            // Create a new admin report document with the provided data and version number
            const createReport = new AdminResponseToBarangayModel({
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
    static async getAdminResponse(reportId) {
        try {
            // Retrieve admin response based on the reportId
            return await AdminResponseToBarangayModel.find({ reportId }).exec();
        } catch (error) {
            throw error;
        }
    }

    // Function to delete an admin response by reportId
    static async deleteAdminResponse(reportId) {
        try {
            // Use Mongoose to delete the admin response by reportId
            return await AdminResponseToBarangayModel.deleteOne({ reportId });
        } catch (error) {
            throw error;
        }
    }




}

module.exports = AdminResponseToBarangayService;
