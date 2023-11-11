const router = require('express').Router();
const AdminResponseController = require("../controllers/admin_response_controller");

router.post('/createAdminResponse', AdminResponseController.createAdminReport);
router.post('/getAdminResponse', AdminResponseController.getAdminResponse);



module.exports = router;
