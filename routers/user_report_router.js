const router = require("express").Router();
const UserReportController = require('../controllers/user_report_controller')

router.post("/createUserReport",UserReportController.createUserReport);
router.post('/getUserReport', UserReportController.getUserReport);
router.post('/getAllReportData', UserReportController.getAllReportData);
router.post('/deleteUserReport', UserReportController.deleteUserReport);
router.put('/updateReportStatus/:_id', UserReportController.editReportStatus);
router.get('/totalReports',  UserReportController.getTotalReportsCount);
router.post('/reports/countByBarangay', UserReportController.countReportByBarangay);
router.post('/reports/countReportByMonth', UserReportController.countReportByMonth);
router.post('/getUserReportById', UserReportController.getUserReportById);

module.exports = router;

//this will setup the api
//to be used by frontend to add data to the db