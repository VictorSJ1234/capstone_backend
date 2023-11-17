const BarangayResponseServices = require('../services/barangay_response_services');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');
const BarangayResponseModel = require('../models/barangay_reponse_model');

// Create admin report
exports.createBarangayReport = async (req, res, next) => {
    try {
        const { reportId, userId, sender, report_status, action_to_do, response_description, date_responded, uploaded_file } = req.body;

        const dateResponded = date_responded ? new Date(date_responded) : new Date();

        // Fetch the latest admin report to get the highest responseId
        const latestAdminReport = await BarangayResponseModel.findOne().sort({ responseId: -1 });

        let responseId = 1;
        if (latestAdminReport && latestAdminReport.responseId !== undefined) {
            // Extract the responseId from the latest admin report and increment
            responseId = parseInt(latestAdminReport.responseId) + 1;
        }

        // Format the responseId to have leading zeros
        const formattedResponseId = responseId.toString().padStart(15, '0');

        const defaultRecipient = "Pasig Dengue Task Force";

        const adminReportData = await BarangayResponseServices.createBarangayReport(
            formattedResponseId,
            reportId,
            userId,
            sender,
            defaultRecipient,
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
exports.getBarangayResponse = async (req, res, next) => {
    try {
        const { reportId } = req.body;

        const barangayResponseData = await BarangayResponseServices.getBarangayResponse(reportId);

        if (!barangayResponseData) {
            // No admin response found for the reportId, return a response indicating that
            res.json({ status: true, barangayResponseData: null });
            return;
        }

         // Decrypt the sensitive data for each response
         const decryptedBarangayResponses = barangayResponseData.map(response => ({
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
        }));

        res.json({ status: true, barangayResponseData: decryptedBarangayResponses });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// Delete admin response by reportId
exports.deleteBarangayResponse = async (req, res, next) => {
    try {
        const { reportId } = req.params;

        // Call the service method to delete admin response by reportId
        const result = await BarangayResponseServices.deleteBarangayResponse(reportId);

        if (result.deletedCount === 0) {
            res.json({ status: false, message: 'No records found to delete for the given reportId.' });
        } else {
            res.json({ status: true, message: 'Admin response deleted successfully.' });
        }
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

