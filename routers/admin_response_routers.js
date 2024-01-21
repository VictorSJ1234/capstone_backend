const router = require('express').Router();
const AdminResponseController = require("../controllers/admin_response_controller");
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware'); 

router.use(apiKeyMiddleware);


router.post('/createAdminResponse', AdminResponseController.createAdminReport);
router.post('/getAdminResponse', AdminResponseController.getAdminResponse);



module.exports = router;
