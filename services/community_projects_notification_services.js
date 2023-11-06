const CommunityProjectNotificationModel = require('../models/community_projects_notification_model');

class CommmunityProjectNotificationService {
    // Function to create a new admin report
    static async createNotification(projectId, userId, reportId, title, message, notificationStatus, dateCreated) {
        try {
            const createNotification = new CommunityProjectNotificationModel({
                projectId,
                userId,
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
    static async getNotificationsByUserAndStatus(userId, notificationStatus) {
        try {
            // Implement the logic to fetch notifications based on userId and notificationStatus
            // You can use Mongoose or any database query to do this
            const notifications = await CommunityProjectNotificationModel.find({ userId, notificationStatus });
            
            return notifications;
        } catch (error) {
            throw error;
        }
    }


    // Function to update notification status by userId and projectId
    static async updateNotificationStatus(userId, projectId, newStatus) {
        try {
            const updatedNotification = await CommunityProjectNotificationModel.findOneAndUpdate(
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
 static async updateReportNotificationStatus(userId, _id, newStatus) {
    try {
        const updatedNotification = await CommunityProjectNotificationModel.findOneAndUpdate(
            { userId, _id },
            { notificationStatus: newStatus },
            { new: true }
        );

        return updatedNotification;
    } catch (error) {
        throw error;
     }
    }

    // Function to delete a user report by its reportId
    static async deleteCommunityProjectNotification(projectId) {
        try {
            // Delete the report based on its reportId
            const deleteProject = await CommunityProjectNotificationModel.deleteMany({ projectId }).exec();
            return deleteProject;
        } catch (error) {
            throw error;
        }
    }

    static async deleteReportNotification(reportId) {
        try {
            // Delete the report based on its reportId
            const deleteProject = await CommunityProjectNotificationModel.deleteMany({ reportId }).exec();
            return deleteProject;
        } catch (error) {
            throw error;
        }
    }

}


module.exports = CommmunityProjectNotificationService;
