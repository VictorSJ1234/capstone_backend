const router = require('express').Router();
const AdminResponseToBarangayController = require("../controllers/admin_response_to_barangay_controller");

router.post('/createAdminResponseToBarangay', AdminResponseToBarangayController.createAdminReport);
router.post('/getAdminResponseToBarangay', AdminResponseToBarangayController.getAdminResponse);
router.delete('/deleteAdminResponseToBarangay/:reportId', AdminResponseToBarangayController.deleteAdminResponse);





module.exports = router;
