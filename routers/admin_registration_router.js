const router = require('express').Router();
const AdminRegistrationController = require("../controllers/admin_registration_controller");
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware'); 

router.use(apiKeyMiddleware);


router.post('/adminRegistration', AdminRegistrationController.register);
router.post('/adminLogin', AdminRegistrationController.login);
router.post('/getAdminData', AdminRegistrationController.getAdminData);
router.post('/getAllAdminData', AdminRegistrationController.getAllAdminData);
router.post('/deleteAdmin', AdminRegistrationController.deleteAdmin);
router.put('/editAdmin/:_id', AdminRegistrationController.editAdmin);
router.put('/editAdminRole/:_id', AdminRegistrationController.editAdminRole);
router.put('/changePassword/:_id', AdminRegistrationController.changePassword);
router.get('/TotalAdminCount', AdminRegistrationController.getTotalAdminInformationCount);
router.post('/resetAdminPassword', AdminRegistrationController.resetPassword);



module.exports = router;

//this will setup the api
//to be used by frontend to add data to the db