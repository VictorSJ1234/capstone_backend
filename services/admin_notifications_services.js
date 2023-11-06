const adminNotificationModel = require('../models/admin_notifications_model');

class adminNotificationService {
    // Function to create a new admin report
    static async createNotification(projectId, userId, adminId, recipient, reportId, title, message, notificationStatus, dateCreated) {
        try {
            const createNotification = new adminNotificationModel({
                projectId,
                userId,
                adminId,
                recipient,
                reportId,
                title,
                message,
                notificationStatus,
                dateCreated
            });

            // Save the new report to the database
            return await createNotification.save();
        } catch (error) {
            throw error;
        }
    }

    // Function to fetch notifications by userId and notificationStatus
    static async getNotificationsByUserAndStatus(adminId, recipient, notificationStatus) {
        try {
            // Implement the logic to fetch notifications based on userId and notificationStatus
            // You can use Mongoose or any database query to do this
            const notifications = await adminNotificationModel.find({ adminId, recipient, notificationStatus });
            
            return notifications;
        } catch (error) {
            throw error;
        }
    }


    // Function to update notification status by userId and projectId
    static async updateNotificationStatus(userId, projectId, newStatus) {
        try {
            const updatedNotification = await adminNotificationModel.findOneAndUpdate(
                { userId, projectId },
                { notificationStatus: newStatus },
                { new: true }
            );

            return updatedNotification;
        } catch (error) {
            throw error;
        }
    }

 // Function to update notification status by userId and projectId
 static async updateReportNotificationStatus(_id, adminId, newStatus) {
    try {
        const updatedNotification = await adminNotificationModel.findOneAndUpdate(
            { _id, adminId },
            { notificationStatus: newStatus },
            { new: true }
        );

        return updatedNotification;
    } catch (error) {
        throw error;
     }
    }

    // Function to delete a user report by its reportId
    static async deleteAdminReportNotificationtification(projectId) {
        try {
            // Delete the report based on its reportId
            const deleteProject = await adminNotificationModel.deleteMany({ projectId }).exec();
            return deleteProject;
        } catch (error) {
            throw error;
        }
    }

    static async deleteReportNotification(reportId) {
        try {
            // Delete the report based on its reportId
            const deleteProject = await adminNotificationModel.deleteMany({ reportId }).exec();
            return deleteProject;
        } catch (error) {
            throw error;
        }
    }

}


module.exports = adminNotificationService;
