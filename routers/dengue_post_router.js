const router = require("express").Router();
const DenguePostController = require('../controllers/dengue_post_controller');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware'); 

router.use(apiKeyMiddleware);


router.post("/createDenguePost", DenguePostController.createDenguePost);
router.post("/getDenguePost", DenguePostController.getDenguePost);
router.post("/getAllDenguePost", DenguePostController.getAllDenguePost);
router.put('/editPost/:_id', DenguePostController.editPost);
router.post('/deleteDenguePost', DenguePostController.deleteDenguePost);
router.post("/getLatestDenguePost", DenguePostController.getLatestDenguePost);


module.exports = router;

//this will setup the api
//to be used by frontend to add data to the db