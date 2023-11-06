const AdminResponseServices = require('../services/admin_response_services');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');
const AdminResponseModel = require('../models/admin_response_model');

// Create admin report
exports.createAdminReport = async (req, res, next) => {
    try {
        const {reportId, userId, report_status, action_to_do, response_description, date_responded, uploaded_file } = req.body;

        // Encrypt sensitive data
        const encryptedReportStatus = encryptData(report_status);
        const encryptedActionToDo = encryptData(action_to_do);
        const encryptedResponseDescription = encryptData(response_description);

        const dateResponded = date_responded ? new Date(date_responded) : new Date();

        // Fetch the latest admin report to get the highest responseId
        const latestAdminReport = await AdminResponseModel.findOne().sort({ responseId: -1 });

        let responseId = 1;
        if (latestAdminReport && latestAdminReport.responseId !== undefined) {
            // Extract the responseId from the latest admin report and increment
            responseId = parseInt(latestAdminReport.responseId) + 1;
        }

        // Format the responseId to have leading zeros
        const formattedResponseId = responseId.toString().padStart(15, '0');

        // Data to be transferred to the database
        const adminReportData = await AdminResponseServices.createAdminReport(
            formattedResponseId,
            reportId,
            userId,
            encryptedReportStatus,
            encryptedActionToDo,
            encryptedResponseDescription,
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

        const adminResponseData = await AdminResponseServices.getAdminResponse(reportId);

        if (!adminResponseData) {
            // No admin response found for the reportId, return a response indicating that
            res.json({ status: true, adminResponseData: null });
            return;
        }

        // Decrypt the sensitive data for each response
        const decryptedAdminResponses = adminResponseData.map(response => ({
            _id: response._id,
            responseId: response.responseId,
            reportId: response.reportId,
            userId: response.userId,
            report_status: decryptData(response.report_status),
            action_to_do: decryptData(response.action_to_do),
            response_description: decryptData(response.response_description),
            date_responded: response.date_responded,
            uploaded_file: response.uploaded_file
        }));

        res.json({ status: true, adminResponseData: decryptedAdminResponses });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};
