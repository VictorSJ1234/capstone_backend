const UserReportServices = require('../services/user_report_services.');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');
const UserReportModel = require('../models/user_report_model');


// Create user report
exports.createUserReport = async (req, res, next) => {
    try {
        const { userId,  barangay, report_type, report_subject, uploaded_file, report_description, postedDate, report_status } = req.body;

        // Data without encryption
        const dateReported = postedDate ? new Date(postedDate) : new Date();
       
        // Fetch the latest report to get the highest reportId
        const latestReport = await UserReportModel.findOne().sort({ reportId: -1 });

        // Fetch the latest report to get the highest reportId
        const latestReportNumber = await UserReportModel.findOne().sort({ report_number: -1 });

        let reportNumber = 1;
        if (latestReport && latestReport.reportId !== undefined) {
            // Extract the report number from the latest reportId and increment
            reportNumber = parseInt(latestReport.reportId) + 1;
        }

        // Format the report number to have leading zeros
        const formattedReportNumber = reportNumber.toString().padStart(15, '0');
        const reportId = formattedReportNumber;

        let UserReportNumber = 1;
        if (latestReportNumber && latestReportNumber.report_number !== undefined) {
            // Extract the report number from the latest reportNumber and increment
            UserReportNumber = parseInt(latestReportNumber.report_number) + 1;
        }

        const convertedUserReportNumber = UserReportNumber.toString();

        const userReportData = await UserReportServices.createUserReport(
            reportId,
            userId,
            convertedUserReportNumber,
            barangay,
            report_type,
            report_subject,
            uploaded_file,
            report_description,
            dateReported,
            report_status
        );

        res.json({ status: true, success: "Report Sent Successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


// Get user report
exports.getUserReport = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const userReportData = await UserReportServices.getUserReport(userId);

        if (userReportData.length === 0) {
            // No reports found for the user, return an empty array
            res.json({ status: true, userReportData: [] });
            return;
        }

        // Data without decryption
        const userReportDataWithoutDecryption = userReportData.map(report => {
            return {
                _id: report._id,
                reportId: report.reportId,
                userId: report.userId,
                report_number: report.report_number,
                barangay: report.barangay,
                report_type: report.report_type,
                report_subject: report.report_subject,
                uploaded_file: report.uploaded_file,
                report_description: report.report_description,
                postedDate: report.postedDate,
                report_status: report.report_status,
            };
        });

        res.json({ status: true, userReportData: userReportDataWithoutDecryption });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


// Get all report data
exports.getAllReportData = async (req, res, next) => {
    try {
        const allReportData = await UserReportServices.getAllReportData();

        if (allReportData.length === 0) {
            // No reports found, return an empty array
            res.json({ status: true, allReportData: [] });
            return;
        }

        // Data without decryption
        const allReportDataWithoutDecryption = allReportData.map(reportData => {
            return {
                _id: reportData._id,
                userId: reportData.userId,
                reportId: reportData.reportId,
                report_number: reportData.report_number,
                barangay: reportData.barangay,
                report_type: reportData.report_type,
                report_subject: reportData.report_subject,
                uploaded_file: reportData.uploaded_file,
                report_description: reportData.report_description,
                postedDate: reportData.postedDate,
                report_status: reportData.report_status,
            };
        });

        res.json({ status: true, allReportData: allReportDataWithoutDecryption });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.deleteUserReport = async (req, res, next) => {
    try {
        const { reportId } = req.body;

        // Perform the deletion operation
        const deletedReport = await UserReportServices.deleteUserReport(reportId);

        if (!deletedReport) {
            // Cannot find the requested report to delete
            return res.status(404).json({ error: "REPORT_NOT_FOUND", message: 'Report not found' });
        }

        res.json({ status: true, success: "Report deleted successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.editReportStatus = async (req, res, next) => {
    try {
        const { _id } = req.params; // Get the user's _id from the frontend
        const {
            report_status,
        } = req.body;

        // Encrypt the updated data
        const updatedData = {
            report_status: report_status,
        };

        // Update the user account in the database
        await UserReportServices.updatedReportStatus(_id, updatedData);

        res.json({ status: true, success: "User account updated successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.getTotalReportsCount = async (req, res, next) => {
    try {
        const totalCount = await UserReportServices.getTotalReportsCount();
        res.json({ status: true, totalCount });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.countReportByBarangay = async (req, res, next) => {
    try {
        const { barangay } = req.body; 

        // Call the new function to count users by barangay
        const count = await UserReportServices.countReportByBarangay(barangay);

        res.json({ status: true, count });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.countReportByMonth = async (req, res, next) => {
    try {
        const { month, year } = req.body;

        // Convert month to a number (e.g., 'January' becomes 0, 'February' becomes 1)
        const monthNumber = new Date(Date.parse(`${month} 1, ${year}`)).getMonth();

        // Call the new function to count reports by month and year
        const count = await UserReportServices.countReportByMonth(monthNumber, year);

        res.json({ status: true, count });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// Get user report by _id
exports.getUserReportById = async (req, res, next) => {
    try {
        const { _id } = req.body; // Assuming _id is in the request parameters

        const userReport = await UserReportServices.getUserReportById(_id);

        if (!userReport) {
            // Report not found, return an error response
            return res.status(404).json({ error: "REPORT_NOT_FOUND", message: 'Report not found' });
        }

        const result = {
            _id: userReport._id,
            reportId: userReport.reportId,
            userId: userReport.userId,
            report_number: userReport.report_number,
            barangay: userReport.barangay,
            report_type: userReport.report_type,
            report_subject: userReport.report_subject,
            uploaded_file: userReport.uploaded_file,
            report_description: userReport.report_description,
            postedDate: userReport.postedDate,
            report_status: userReport.report_status,
        };

        res.json({ status: true, userReport: result });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.countReportByStatus = async (req, res, next) => {
    try {
        const { reportStatus } = req.body;
        const count = await UserReportServices.countReportByStatus(reportStatus);

        res.json({ status: true, count });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.countReportByStatusAndBarangay = async (req, res, next) => {
    try {
        const { barangay, reportStatus } = req.body;
        const count = await UserReportServices.countReportByStatusAndBarangay(barangay, reportStatus);

        res.json({ status: true, count });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};










//process the userinputted data