const UserReportServices = require('../services/user_report_services.');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');
const UserReportModel = require('../models/user_report_model');


//post user report
exports.createUserReport = async (req, res, next) => {
    try {
        const { userId,  barangay, report_type, report_subject, uploaded_file, report_description, postedDate, report_status } = req.body;

        // Encrypt the sensitive data
        const encryptedBarangay = encryptData(barangay);
        const encryptedReportSubject = encryptData(report_subject);
        const encryptedReportType = encryptData(report_type);
        const encryptedReportDescription = encryptData(report_description);
        const encryptedReportStatus = encryptData(report_status);
         // Encrypt each element of the uploaded_file array
        //const encryptedUploadedFiles = uploaded_file.map(file => encryptData(file));

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


       //data that will be transferred to the database
        const userReportData = await UserReportServices.createUserReport(
            reportId,
            userId,
            convertedUserReportNumber,
            encryptedBarangay,
            encryptedReportType,
            encryptedReportSubject,
            uploaded_file,
            encryptedReportDescription,
            dateReported,
            encryptedReportStatus
        );

        res.json({ status: true, success: "Report Sent Successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// get user report
exports.getUserReport = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const userReportData = await UserReportServices.getUserReport(userId);

        if (userReportData.length === 0) {
            // No reports found for the user, return an empty array
            res.json({ status: true, userReportData: [] });
            return;
        }

        // Decrypt the sensitive data for each report
        const decryptedUserReportData = userReportData.map(report => {
            const decryptedBarangay = decryptData(report.barangay);
            const decryptedReportType= decryptData(report.report_type);
            const decryptedReportSubject = decryptData(report.report_subject);
            const decryptedReportDescription = decryptData(report.report_description);
            const decryptedReportStatus = decryptData(report.report_status);
            //const decryptedUploadedFiles = report.uploaded_file.map(file => decryptData(file));

            return {
                _id: report._id,
                reportId: report.reportId,
                userId: report.userId,
                report_number: report.report_number,
                barangay: decryptedBarangay,
                report_type: decryptedReportType,
                report_subject: decryptedReportSubject,
                uploaded_file: report.uploaded_file,
                report_description: decryptedReportDescription,
                postedDate: report.postedDate,
                report_status: decryptedReportStatus,
            };
        });

        res.json({ status: true, userReportData: decryptedUserReportData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

//get all report dataa
exports.getAllReportData = async (req, res, next) => {
    try {
        const allReportData = await UserReportServices.getAllReportData();

        // Decrypt the sensitive data for each user
        const decryptedReportData = allReportData.map(reportData => {
            const decryptedBarangay = decryptData(reportData.barangay);
            const decryptedReportType= decryptData(reportData.report_type);
            const decryptedReportSubject = decryptData(reportData.report_subject);
            //const decryptedUploadedFiles = reportData.uploaded_file.map(file => decryptData(file));
            const decryptedReportDescription = decryptData(reportData.report_description);
            const decryptedReportStatus = decryptData(reportData.report_status);

            return {
                _id: reportData._id,
                userId: reportData.userId,
                reportId: reportData.reportId,
                report_number: reportData.report_number,
                barangay: decryptedBarangay,
                report_type: decryptedReportType,
                report_subject: decryptedReportSubject,
                uploaded_file: reportData.uploaded_file,
                report_description: decryptedReportDescription,
                postedDate: reportData.postedDate,
                report_status: decryptedReportStatus,
            };
        });

        res.json({ status: true, allReportData: decryptedReportData });
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
            report_status: encryptData(report_status),
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
        const count = await UserReportServices.countReportByBarangay(encryptData(barangay));

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

//get user report by _id
exports.getUserReportById = async (req, res, next) => {
    try {
        const { _id } = req.body; // Assuming _id is in the request parameters

        const userReport = await UserReportServices.getUserReportById(_id);

        if (!userReport) {
            // Report not found, return an error response
            return res.status(404).json({ error: "REPORT_NOT_FOUND", message: 'Report not found' });
        }

        // Decrypt the sensitive data
        const decryptedBarangay = decryptData(userReport.barangay);
        const decryptedReportType = decryptData(userReport.report_type);
        const decryptedReportSubject = decryptData(userReport.report_subject);
        const decryptedReportDescription = decryptData(userReport.report_description);
        const decryptedReportStatus = decryptData(userReport.report_status);

        const result = {
            _id: userReport._id,
            reportId: userReport.reportId,
            userId: userReport.userId,
            report_number: userReport.report_number,
            barangay: decryptedBarangay,
            report_type: decryptedReportType,
            report_subject: decryptedReportSubject,
            uploaded_file: userReport.uploaded_file,
            report_description: decryptedReportDescription,
            postedDate: userReport.postedDate,
            report_status: decryptedReportStatus,
        };

        res.json({ status: true, userReport: result });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};









//process the userinputted data