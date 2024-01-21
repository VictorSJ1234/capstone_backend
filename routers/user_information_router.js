const router = require('express').Router();
const UserController = require("../controllers/user_information_controller");
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware'); 

router.use(apiKeyMiddleware);

router.post('/registration', UserController.register);
router.post('/login', UserController.login);
router.post('/getUserData', UserController.getUserData);
router.post('/getAllUserData', UserController.getAllUserData);
router.post('/deleteUser', UserController.deleteUser);
router.put('/updateAccountStatus/:_id', UserController.editUserStatus);
router.put('/editUser/:_id', UserController.editUser);
router.put('/changeMobileUserPassword/:_id', UserController.changePassword);
router.get('/TotalMobileUser', UserController.getTotalUserInformationCount);
router.post('/users/countByBarangay', UserController.countUsersByBarangay);
router.post('/resetPassword', UserController.resetPassword);



module.exports = router;

//this will setup the api
//to be used by frontend to add data to the db