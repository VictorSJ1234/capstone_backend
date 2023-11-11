const router = require('express').Router();
const AdminResponseController = require("../controllers/admin_response_controller");
const cors = require('../cors'); 
router.use(cors());

router.post('/createAdminResponse', AdminResponseController.createAdminReport);
router.post('/getAdminResponse', AdminResponseController.getAdminResponse);



module.exports = router;
