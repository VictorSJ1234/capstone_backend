const router = require("express").Router();
const CommunityProjectNotificationController = require('../controllers/community_project_notification_controller');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware'); 

router.use(apiKeyMiddleware);


router.post("/createNotificationStatus", CommunityProjectNotificationController.createCommunityProjectNotification);
router.post("/getNotificationStatus", CommunityProjectNotificationController.getNotificationsByUserAndStatus); 
router.put("/updateNotificationStatus", CommunityProjectNotificationController.updateNotificationStatus);
router.put("/updateReportNotificationStatus", CommunityProjectNotificationController.updateReportNotificationStatus);
router.post('/deleteCommunityProjectNotification', CommunityProjectNotificationController.deleteCommunityProjectNotification);
router.post('/deleteReportNotification', CommunityProjectNotificationController.deleteReportNotification);



module.exports = router;

//this will setup the api
//to be used by frontend to add data to the db