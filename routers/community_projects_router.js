const router = require("express").Router();
const CommunityProjectsController = require('../controllers/community_projects_controller');

router.post("/createCommunityProject", CommunityProjectsController.createCommunityProject);
router.post("/getCommunityProject", CommunityProjectsController.getCommunityProject);
router.post("/getAllCommunityProjects", CommunityProjectsController.getAllCommunityProjects);
router.put('/editCommunityProject/:_id', CommunityProjectsController.editProject);
router.post('/deleteCommunityProject', CommunityProjectsController.deleteCommunityProject);

module.exports = router;

//this will setup the api
//to be used by frontend to add data to the db