const router = require("express").Router();
const ReportToBarangayController = require('../controllers/report_to_barangay_controller');
const cors = require('cors'); 
router.use(cors());

router.post("/createReportToBarangay", ReportToBarangayController.createReportToBarangay);
router.post("/getReportToBarangay", ReportToBarangayController.getReportToBarangay);
router.post("/getAllReportToBarangay", ReportToBarangayController.getAllReportToBarangay);
router.post("/getReportByBarangay", ReportToBarangayController.getReportByBarangay);
router.put('/updateReportToBarangayStatus/:_id', ReportToBarangayController.editReportStatus);
router.post("/getTotalReportsByBarangay", ReportToBarangayController.getTotalReportsByBarangay);
router.post('/deleteReportToBarangay', ReportToBarangayController.deleteReportToBarangay);


module.exports = router;

//this will setup the api
//to be used by frontend to add data to the db