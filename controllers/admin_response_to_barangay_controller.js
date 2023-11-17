const AdminResponseToBarangayService = require('../services/admin_response_to_barangay_services');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');
const AdminResponseToBarangayModel = require('../models/admin_response_to_barangay_model');

// Create admin report
exports.createAdminReport = async (req, res, next) => {
    try {
        const { reportId, userId, recipient, report_status, action_to_do, response_description, date_responded, uploaded_file } = req.body;

        const dateResponded = date_responded ? new Date(date_responded) : new Date();
        const defaultSender = "Pasig Dengue Task Force";

        // Fetch the latest admin report to get the highest responseId
        const latestAdminReport = await AdminResponseToBarangayModel.findOne().sort({ responseId: -1 });

        let responseId = 1;
        if (latestAdminReport && latestAdminReport.responseId !== undefined) {
            // Extract the responseId from the latest admin report and increment
            responseId = parseInt(latestAdminReport.responseId) + 1;
        }

        // Format the responseId to have leading zeros
        const formattedResponseId = responseId.toString().padStart(15, '0');

        const adminReportData = await AdminResponseToBarangayService.createAdminReport(
            formattedResponseId,
            reportId,
            userId,
            defaultSender,
            recipient,
            report_status,
            action_to_do,
            response_description,
            dateResponded,
            uploaded_file
        );

        res.json({ status: true, success: "Admin Response Created Successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


// get admin response by reportId
exports.getAdminResponse = async (req, res, next) => {
    try {
        const { reportId } = req.body;

        const adminResponseData = await AdminResponseToBarangayService.getAdminResponse(reportId);

        if (!adminResponseData) {
            // No admin response found for the reportId, return a response indicating that
            res.json({ status: true, adminResponseData: null });
            return;
        }

         // Decrypt the sensitive data for each response
         const decryptedAdminResponses = adminResponseData.map(response => ({
            responseId: response.responseId,
            reportId: response.reportId,
            userId: response.userId,
            sender: response.sender,
            recipient: response.recipient,
            report_status: response.report_status,
            action_to_do: response.action_to_do,
            response_description: response.response_description,
            date_responded: response.date_responded,
            uploaded_file: response.uploaded_file
            //uploaded_file: response.uploaded_file.map(file => decryptData(file))
        }));

        res.json({ status: true, adminResponseData: decryptedAdminResponses });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// Function to delete an admin response by reportId
exports.deleteAdminResponse = async (req, res, next) => {
    try {
        const { reportId } = req.params;

        // Call the service function to delete the admin response
        await AdminResponseToBarangayService.deleteAdminResponse(reportId);

        res.json({ status: true, message: 'Admin Response Deleted Successfully' });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

