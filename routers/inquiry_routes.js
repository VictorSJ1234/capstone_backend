const router = require("express").Router();
const InquiryController = require('../controllers/inquiry_controller');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware'); 

router.use(apiKeyMiddleware);


router.post("/createInquiry", InquiryController.createInquiry);
router.post("/getInquiry", InquiryController.getInquiry);
router.post("/getAllInquiries", InquiryController.getAllInquiries);
router.put('/editInquiry/:_id', InquiryController.editProject);
router.post('/deleteInquiry', InquiryController.deleteInquiry);
router.post('/sendToMail', InquiryController.InquiryResponse);
router.get('/TotalInquiry', InquiryController.getTotalUserInquiryCount);

module.exports = router;

//this will setup the api
//to be used by frontend to add data to the db