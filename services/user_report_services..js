//database operarations
const UserReportModel = require('../models/user_report_model');


class UserReportServices{
    // Function to create a user report
    static async createUserReport(reportId, userId, report_number, barangay, report_type, report_subject, uploaded_file, report_description, postedDate, report_status){
        // Function to create a user report
            const createUserReport = new UserReportModel({reportId, userId, report_number, barangay, report_type, report_subject, uploaded_file, report_description, postedDate, report_status});
            // Save the new user report to the database
            return await createUserReport.save();
    }

   // Function to get user reports by userId
    static async getUserReport(userId) {
        // Retrieve user reports based on the userId
        const reportList = await UserReportModel.find({ userId }).exec();
        return reportList;
    }

    // Function to get data for all reports
     static async getAllReportData() {
        try {
            // Retrieve data for all user reports in the database
            return await UserReportModel.find();
        } catch (error) {
            throw error;
        }
    }

    // Function to delete a user report by its reportId
    static async deleteUserReport(reportId) {
        try {
            // Delete the report based on its reportId
            const deletedReport = await UserReportModel.findOneAndDelete({ reportId }).exec();
            return deletedReport;
        } catch (error) {
            throw error;
        }
    }

    // Function to update user account status by _id
    static async updatedReportStatus(_id, updatedData) {
        try {
            // Update the user based on their _id with the new data
            await UserReportModel.findByIdAndUpdate(_id, updatedData).exec();
        } catch (error) {
            throw error;
        }
    }

    // Function to get the total count of user_reports
    static async getTotalReportsCount() {
        try {
            const totalCount = await UserReportModel.countDocuments().exec();
            return totalCount;
        } catch (error) {
            throw error;
        }
    }

     //new function to count users by barangay
     static async countReportByBarangay(barangay) {
        try {
            const count = await UserReportModel.countDocuments({ barangay }).exec();
            return count;
        } catch (error) {
            throw error;
        }
    }

    // Function to count user reports by month and year
    static async countReportByMonth(month, year) {
        try {
            const count = await UserReportModel.countDocuments({
                postedDate: {
                    $gte: new Date(year, month, 1),   // Start of the month
                    $lt: new Date(year, month + 1, 1) // Start of the next month
                }
            }).exec();
            return count;
        } catch (error) {
            throw error;
        }
    }

    // Function to get a user report by its _id
    static async getUserReportById(_id) {
        try {
            // Retrieve the user report based on its _id
            return await UserReportModel.findOne({ _id }).exec();
        } catch (error) {
            throw error;
        }
    }

    // Function to count user reports by status
    static async countReportByStatus(reportStatus) {
        try {
            const count = await UserReportModel.countDocuments({ report_status: reportStatus }).exec();
            return count;
        } catch (error) {
            throw error;
        }
    }

    static async countReportByStatusAndBarangay(barangay, reportStatus) {
        try {
            const count = await UserReportModel.countDocuments({ barangay, report_status: reportStatus }).exec();
            return count;
        } catch (error) {
            throw error;
        }
    }



}

module.exports = UserReportServices;