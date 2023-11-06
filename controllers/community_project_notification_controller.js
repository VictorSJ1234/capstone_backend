const CommunityProjectNotificationService = require('../services/community_projects_notification_services'); 
const { encryptData, decryptData } = require('../data_encryption/data_encryption');

// Create a new community report
exports.createCommunityProjectNotification = async (req, res, next) => {
    try {
        const { projectId, userId, reportId,  title, message, notificationStatus, dateCreated} = req.body;
        console.log('Received notification data:', req.body);

        const createdDate = dateCreated ? new Date(dateCreated) : new Date();

        // Data to be transferred to the database
        const communityProjectsNotificationData = await CommunityProjectNotificationService.createNotification(
            projectId,
            userId,
            reportId,
            title,
            message,
            notificationStatus,
            createdDate
        );

        res.json({ status: true, success: "Community Project Created Successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


// Fetch notifications by userId and notificationStatus
exports.getNotificationsByUserAndStatus = async (req, res, next) => {
    try {
        const { userId, notificationStatus } = req.body;

        // Call the service function to fetch notifications based on userId and notificationStatus
        const notifications = await CommunityProjectNotificationService.getNotificationsByUserAndStatus(userId, notificationStatus);

        if (notifications) {
            res.json({ notifications });
        } else {
            res.status(404).json({ status: false, error: "Notifications not found" });
        }
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


// Update notification status for a specific project and user
exports.updateNotificationStatus = async (req, res, next) => {
    try {
        const { projectId, userId, newStatus } = req.body;

        // Call the service function to update the notificationStatus
        const updatedNotification = await CommunityProjectNotificationService.updateNotificationStatus(userId, projectId, newStatus);

        if (updatedNotification) {
            res.json({ status: true, success: "Notification status updated successfully" });
        } else {
            res.status(404).json({ status: false, error: "Notification status update failed" });
        }
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.updateReportNotificationStatus = async (req, res, next) => {
    try {
        const { _id, userId, newStatus } = req.body;

        console.log('Received notification data:', req.body);

        // Call the service function to update the notificationStatus
        const updatedNotification = await CommunityProjectNotificationService.updateReportNotificationStatus(userId, _id, newStatus);

        if (updatedNotification) {
            res.json({ status: true, success: "Notification status updated successfully" });
        } else {
            res.status(404).json({ status: false, error: "Notification status update failed" });
        }
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.deleteCommunityProjectNotification = async (req, res, next) => {
    try {
        const { projectId } = req.body;

        // Perform the deletion operation
        const deleteProject = await CommunityProjectNotificationService.deleteCommunityProjectNotification(projectId);

        if (!deleteProject) {
            // Cannot find the requested report to delete
            return res.status(404).json({ error: "REPORT_NOT_FOUND", message: 'Report not found' });
        }

        res.json({ status: true, success: "project deleted successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.deleteReportNotification = async (req, res, next) => {
    try {
        const { reportId } = req.body;

        // Perform the deletion operation
        const deleteProject = await CommunityProjectNotificationService.deleteReportNotification(reportId);

        if (!deleteProject) {
            // Cannot find the requested report to delete
            return res.status(404).json({ error: "REPORT_NOT_FOUND", message: 'Report not found' });
        }

        res.json({ status: true, success: "project deleted successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};



