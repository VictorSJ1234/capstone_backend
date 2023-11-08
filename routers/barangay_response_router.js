const router = require('express').Router();
const BarangayResponseController = require("../controllers/barangay_response_controller");

router.post('/createBarangayResponse', BarangayResponseController.createBarangayReport);
router.post('/getBarangayResponse', BarangayResponseController.getBarangayResponse);
router.delete('/deleteBarangayResponse/:reportId', BarangayResponseController.deleteBarangayResponse);




module.exports = router;
