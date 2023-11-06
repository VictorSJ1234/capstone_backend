const BarangayResponseModel = require('../models/barangay_reponse_model');
const ReportToBarangayModel = require('../models/report_to_barangay_model'); 

class ReportToBarangayService {
  // Function to create a new admin report
  static async createReportToBarangay(reportId, report_number, barangay, status, report_subject, uploaded_file, details, date_created) {
    try {
      const createReport = new ReportToBarangayModel({
        reportId,
        report_number,
        barangay,
        status,
        report_subject,
        uploaded_file,
        details,
        date_created
      });

      // Save the new report to the database
      return await createReport.save();
    } catch (error) {
      throw error;
    }
  }

  // Function to get user community project by _id
  static async getReportToBarangay(_id) {
    // Retrieve user reports based on the _id
    const reportToBarangayList = await ReportToBarangayModel.find({ _id }).exec();
    return reportToBarangayList;
  }

  // Function to get report to Barangay by barangay
  static async getReportByBarangay(barangay) {
    // Retrieve reports based on the barangay
    const reportToBarangayList = await ReportToBarangayModel.find({ barangay }).exec();
    return reportToBarangayList;
  }


  // Function to get all community projects
  static async getAllReportToBarangay() {
    try {
      // Retrieve all community projects from the database
      const allReportToBarangay = await ReportToBarangayModel.find({}).exec();
      return allReportToBarangay;
    } catch (error) {
      throw error;
    }
  }

  // Function to update user account status by _id
  static async updatedReportStatus(_id, updatedData) {
    try {
        // Update the user based on their _id with the new data
        await ReportToBarangayModel.findByIdAndUpdate(_id, updatedData).exec();
    } catch (error) {
        throw error;
    }
  }

  // Function to get the total number of reports by barangay
static async getTotalReportsByBarangay(barangay) {
  try {
      const totalReports = await ReportToBarangayModel.countDocuments({ barangay }).exec();
      return totalReports;
    } catch (error) {
      throw error;
    }
  }

  // Function to delete a report by _id
static async deleteReportToBarangay(_id) {
  try {
      await ReportToBarangayModel.findByIdAndDelete(_id).exec();
  } catch (error) {
      throw error;
  }
}

}

module.exports = ReportToBarangayService;
