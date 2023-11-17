const ReportToBarangayService = require('../services/report_to_barangay_services'); 
const ReportToBarangayModel = require('../models/report_to_barangay_model');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');

exports.createReportToBarangay = async (req, res, next) => {
    try {
        const { barangay, status, report_subject, uploaded_file, details, date_created } = req.body;

        const dateReported = date_created ? new Date(date_created) : new Date();

        // Fetch the latest report to get the highest reportId
        const latestReport = await ReportToBarangayModel.findOne().sort({ reportId: -1 });

        // Fetch the latest report to get the highest reportId
        const latestReportNumber = await ReportToBarangayModel.findOne().sort({ report_number: -1 });

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

        const reportToBarangayData = await ReportToBarangayService.createReportToBarangay(
            reportId,
            convertedUserReportNumber,
            barangay,
            status,
            report_subject,
            uploaded_file,
            details,
            dateReported
        );

        res.json({ status: true, success: "Report to Barangay Created Successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


// Get report to Barangay by _id
exports.getReportToBarangay = async (req, res, next) => {
    try {
        const { _id } = req.body;

        const reportToBarangayData = await ReportToBarangayService.getReportToBarangay(_id);

        if (reportToBarangayData.length === 0) {
            // No reports found for the user, return an empty array
            res.json({ status: true, reportToBarangayData: [] });
            return;
        }

        const decryptedReportToBarangayData = reportToBarangayData.map(report => ({
            _id: report._id,
            reportId: report.reportId,
            report_number: report.report_number,
            barangay: report.barangay,
            status: report.status,
            report_subject: report.report_subject,
            uploaded_file: report.uploaded_file,
            details: report.details,
            date_created: report.date_created
        }));

        res.json({ status: true, reportToBarangayData: decryptedReportToBarangayData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


// Get report to Barangay by barangay
exports.getReportByBarangay = async (req, res, next) => {
    try {
        const { barangay } = req.body;

        const reportToBarangayData = await ReportToBarangayService.getReportByBarangay(barangay);

        if (reportToBarangayData.length === 0) {
            // No reports found for the barangay, return an empty array
            res.json({ status: true, reportToBarangayData: [] });
            return;
        }

        const decryptedReportToBarangayData = reportToBarangayData.map(report => ({
            _id: report._id,
            reportId: report.reportId,
            report_number: report.report_number,
            barangay: report.barangay,
            status: report.status,
            report_subject: report.report_subject,
            uploaded_file: report.uploaded_file,
            details: report.details,
            date_created: report.date_created
        }));

        res.json({ status: true, reportToBarangayData: decryptedReportToBarangayData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};



// Get all report to Barangay data
exports.getAllReportToBarangay = async (req, res, next) => {
    try {
        const allReportToBarangay = await ReportToBarangayService.getAllReportToBarangay();

        if (allReportToBarangay.length === 0) {
            // No reports found, return an empty array
            res.json({ status: true, reportToBarangayData: [] });
            return;
        }

        allReportToBarangay.sort((a, b) => b.date_created - a.date_created);
        
        // Data without encryption and decryption
        const decryptedReportToBarangayData = allReportToBarangay.map(report => ({
            _id: report._id,
            reportId: report.reportId,
            report_number: report.report_number,
            barangay: report.barangay,
            status: report.status,
            report_subject: report.report_subject,
            uploaded_file: report.uploaded_file,
            details: report.details,
            date_created: report.date_created
        }));

        res.json({ status: true, reportToBarangayData: decryptedReportToBarangayData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.editReportStatus = async (req, res, next) => {
    try {
        const { _id } = req.params; // Get the user's _id from the frontend
        const {
            status,
        } = req.body;

        // Encrypt the updated data
        const updatedData = {
            status: status,
        };

        // Update the user account in the database
        await ReportToBarangayService.updatedReportStatus(_id, updatedData);

        res.json({ status: true, success: "Report status updated successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// Get the total number of reports by barangay
exports.getTotalReportsByBarangay = async (req, res, next) => {
    try {
        const { barangay } = req.body; 

        const totalReports = await ReportToBarangayService.getTotalReportsByBarangay(barangay);

        res.json({ status: true, totalReports });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// Delete a report by _id using a POST request
exports.deleteReportToBarangay = async (req, res, next) => {
    try {
        const { _id } = req.body; 
        await ReportToBarangayService.deleteReportToBarangay(_id);

        res.json({ status: true, success: "Report deleted successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

