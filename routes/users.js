const express = require('express');
let router = express.Router();



const { GetIndividualClientProfile, GetIndividualFreelancerProfile, GetCompleteClientProfile, GetCompleteFreelancerProfile } = require('../controllers/Profile/Profile');
const { GetBusinessFreelancerCompleteProfile, GetBusinessClientCompleteProfile, GetBusinessClientProfile, GetBusinessFreelancerProfile, UpdateBusinessFreelancerProfile, UpdateBusinessClientProfile } = require('../controllers/Profile/Business-Profile/Profile');
const  { GetBusinessPortfolio } = require('../controllers/Profile/Business-Profile/Portfolio');
const  { GetBusinessSkills } = require('../controllers/Profile/Business-Profile/Skills');
const { GetBusinessPostJob, GetIndividualPostJob} = require('../controllers/Job/PostJob');
const { GetDashboardSwitch } = require('../controllers/Dashboard/DashboardSwitch');
const {NotVerified} = require('../controllers/Auth/Verify');
const {GetDashboardBusinessClient} = require('../controllers/Dashboard/DashboardBusinessClient');
const {GetDashboardBusinessFreelancer} = require('../controllers/Dashboard/DashboardBusinessFreelancer');
const {GetDashboardIndividualClient} = require('../controllers/Dashboard/DashboardIndividualClient');
const {GetDashboardIndividualFreelancer} = require('../controllers/Dashboard/DashboardIndividualFreelancer');

  



/* GET users listing. */
router.get('/', GetDashboardSwitch);
router.get('/notverified', NotVerified);



//get dashboards
router.get('/dashboard-business-freelancer', GetDashboardBusinessFreelancer);
router.get('/dashboard-business-client', GetDashboardBusinessClient);
router.get('/dashboard-individual-client', GetDashboardIndividualClient);
router.get('/dashboard-individual-freelancer', GetDashboardIndividualFreelancer);




//complete profile
router.get('/complete-business-client-profile', GetBusinessClientCompleteProfile);
router.get('/complete-business-freelancer-profile', GetBusinessFreelancerCompleteProfile);
router.get('/update-business-freelancer-profile', UpdateBusinessFreelancerProfile);
router.get('/update-business-client-profile', UpdateBusinessClientProfile);





//get profile
router.get('/business-client-profile', GetBusinessClientProfile);
router.get('/business-freelancer-profile', GetBusinessFreelancerProfile);
router.get('/business-portfolio', GetBusinessPortfolio);
router.get('/business-skills', GetBusinessSkills);


//post job
router.get('/business-post-job', GetBusinessPostJob);
router.get('/individual-post-job', GetIndividualPostJob);



router.get('/individual-client-profile', GetIndividualClientProfile);
router.get('/individual-freelancer-profile', GetIndividualFreelancerProfile);
router.get('/complete-individual-client-profile', GetCompleteClientProfile);
router.get('/complete-individual-freelancer-profile', GetCompleteFreelancerProfile);




module.exports = router;
