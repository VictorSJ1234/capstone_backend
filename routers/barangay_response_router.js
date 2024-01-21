const router = require('express').Router();
const BarangayResponseController = require("../controllers/barangay_response_controller");
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware'); 

router.use(apiKeyMiddleware);


router.post('/createBarangayResponse', BarangayResponseController.createBarangayReport);
router.post('/getBarangayResponse', BarangayResponseController.getBarangayResponse);
router.delete('/deleteBarangayResponse/:reportId', BarangayResponseController.deleteBarangayResponse);




module.exports = router;
