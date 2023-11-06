const adminNotificationService = require('../services/admin_notifications_services'); 
const { encryptData, decryptData } = require('../data_encryption/data_encryption');

// Create a new notification
exports.createAdminNotification = async (req, res, next) => {
    try {
        const { projectId, userId, adminId, recipient,  reportId,  title, message, notificationStatus, dateCreated} = req.body;
        console.log('Received notification data:', req.body);

        const createdDate = dateCreated ? new Date(dateCreated) : new Date();

        // Data to be transferred to the database
        const adminNotificationData = await adminNotificationService.createNotification(
            projectId,
            userId,
            adminId,
            recipient,
            reportId,
            title,
            message,
            notificationStatus,
            createdDate
        );

        res.json({ status: true, success: "Notification Project Created Successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


// Fetch notifications by userId and notificationStatus
exports.getNotificationsByUserAndStatusAndRecipient = async (req, res, next) => {
    try {
        const { adminId, recipient, notificationStatus } = req.body;

        // Call the service function to fetch notifications based on userId and notificationStatus
        const notifications = await adminNotificationService.getNotificationsByUserAndStatus(adminId, recipient, notificationStatus);

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
        const updatedNotification = await adminNotificationService.updateNotificationStatus(userId, projectId, newStatus);

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
        const { _id, adminId, newStatus } = req.body;

        console.log('Received notification data:', req.body);

        // Call the service function to update the notificationStatus
        const updatedNotification = await adminNotificationService.updateReportNotificationStatus(_id, adminId, newStatus);

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

exports.deleteAdminReportNotificationtification = async (req, res, next) => {
    try {
        const { projectId } = req.body;

        // Perform the deletion operation
        const deleteProject = await adminNotificationService.deleteAdminReportNotificationtification(projectId);

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
        const deleteProject = await adminNotificationService.deleteReportNotification(reportId);

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



