const router = require("express").Router();
const AdminNotificationController = require('../controllers/admin_notifications_controller');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware'); 

router.use(apiKeyMiddleware);


router.post("/createAdminNotificationStatus", AdminNotificationController.createAdminNotification);
router.post("/getAdminNotificationStatus", AdminNotificationController.getNotificationsByUserAndStatusAndRecipient); 
router.put("/updateAdminNotificationStatus", AdminNotificationController.updateNotificationStatus);
router.put("/updateAdminReportNotificationStatus", AdminNotificationController.updateReportNotificationStatus);
router.post('/deleteReportNotificationById', AdminNotificationController.deleteReportNotification);



module.exports = router;

//this will setup the api
//to be used by frontend to add data to the db