const express = require('express');
let router = express.Router();

const { GetIndividualClientProfile, GetIndividualFreelancerProfile, GetCompleteClientProfile, GetCompleteFreelancerProfile, GetCompleteFreelancerPortfolio, GetCompleteFreelancerSkills, UpdateProfile } = require('../controllers/Profile/Profile');
const { GetBusinessFreelancerCompleteProfile,GetBusinessFreelancerCompletePortfolio, GetBusinessFreelancerCompleteSkills, GetBusinessClientCompleteProfile, GetBusinessClientProfile, GetBusinessFreelancerProfile, UpdateBusinessProfile, UploadBusinessCertificate, GetBusinessCertificate } = require('../controllers/Profile/BusinessProfile');
const  { GetBusinessPortfolio } = require('../controllers/Profile/BusinessPortfolio');
const  { GetBusinessSkills } = require('../controllers/Profile/BusinessSkills');
const { GetIndividualPostJob, DoIndividualPostJob, GetAllIndividualFreelancers} = require('../controllers/Job/PostJob');
const { GetBusinessPostJob, DoBusinessPostJob} = require('../controllers/Job/BusinessPostJob');
const { GetDashboardSwitch } = require('../controllers/Dashboard/DashboardSwitch');
const {NotVerified} = require('../controllers/Auth/Verify');
const {GetDashboardBusinessClient} = require('../controllers/Dashboard/DashboardBusinessClient');
const {GetDashboardBusinessFreelancer} = require('../controllers/Dashboard/DashboardBusinessFreelancer');
const {GetDashboardIndividualClient} = require('../controllers/Dashboard/DashboardIndividualClient');
const {GetDashboardIndividualFreelancer} = require('../controllers/Dashboard/DashboardIndividualFreelancer');
const {AddBusinessPortfolio, UpdateBusinessPortfolio, GetAddBusinessPortfolio} = require('../controllers/Profile/BusinessPortfolio');
const { GetDashboardAdmin } = require('../controllers/Dashboard/DashboardAdmin');
const { AddBusinessSkills } = require('../controllers/Profile/BusinessSkills');
const { AddPortfolio } = require('../controllers/Profile/Portfolio');
const { AddSkills } = require('../controllers/Profile/Skills');
const { GetJobCat, GetSkills, PostSkills, PostJobCategory } = require('../controllers/temp');
const {GetAllJobsFreelancer} = require('../controllers/Job/JobFreelancer');
const {GetJobById, ApplyJob,AcceptJob, DeleteJobApplication, GetSingleJobDetail } = require('../controllers/Job/JobFreelancer');
const {GetSingleJob} = require('../controllers/Job/UpdateJob');
const {AwardJob} = require('../controllers/Job/ViewJobClient');
const {GetJobByIdBusiness, AcceptJobBusiness, GetAllJobsFreelancerBusiness, ApplyJobBusiness,GetSingleJobDetailBusiness} = require('../controllers/Job/JobFreelancerBusiness');

  

router.get('/all-freelancers', GetAllIndividualFreelancers);


router.get('/award-job/:id', AwardJob);
router.get('/accept-job/:id', AcceptJob);
router.get('/accept-job-business/:id', AcceptJobBusiness);



router.get('/view-single-job-business/:id', GetSingleJobDetailBusiness);
router.get('/view-single-job/:id', GetSingleJobDetail);
router.get('/job-view/:id', GetSingleJob);


router.get('/jobcategory', GetJobCat);
router.get('/skills', GetSkills);



router.post('/jobcategory', PostJobCategory);
router.post('/skills', PostSkills);




/* GET users listing. */
router.get('/', GetDashboardSwitch);
router.get('/notverified', NotVerified);



//get dashboards
router.get('/dashboard-business-freelancer', GetDashboardBusinessFreelancer);
router.get('/dashboard-business-client', GetDashboardBusinessClient);
router.get('/dashboard-individual-client', GetDashboardIndividualClient);
router.get('/dashboard-individual-freelancer', GetDashboardIndividualFreelancer);
router.get('/dashboard-admin', GetDashboardAdmin);





//complete profile
router.get('/complete-business-client-profile', GetBusinessClientCompleteProfile);
router.get('/complete-business-freelancer-profile', GetBusinessFreelancerCompleteProfile);
router.get('/complete-business-freelancer-portfolio', GetBusinessFreelancerCompletePortfolio);
router.get('/complete-business-freelancer-skills', GetBusinessFreelancerCompleteSkills);
router.get('/complete-business-certificate', GetBusinessCertificate);
router.get('/complete-individual-client-profile', GetCompleteClientProfile);
router.get('/complete-individual-freelancer-profile', GetCompleteFreelancerProfile);
router.get('/complete-individual-freelancer-portfolio', GetCompleteFreelancerPortfolio);
router.get('/complete-individual-freelancer-skills', GetCompleteFreelancerSkills);



//get profile
router.get('/business-client-profile', GetBusinessClientProfile);
router.get('/business-freelancer-profile', GetBusinessFreelancerProfile);
router.get('/business-portfolio', GetBusinessPortfolio);
router.get('/business-skills', GetBusinessSkills);
router.get('/add-business-portfolio', GetAddBusinessPortfolio);

  

//post job
router.get('/business-post-job', GetBusinessPostJob);
router.get('/individual-post-job', GetIndividualPostJob);

router.get('/jobs', GetAllJobsFreelancer);
router.get('/jobs-business', GetAllJobsFreelancerBusiness);
router.get('/job/:id', GetJobById);
router.get('/job-business/:id', GetJobByIdBusiness);


router.get('/individual-client-profile', GetIndividualClientProfile);
router.get('/individual-freelancer-profile', GetIndividualFreelancerProfile);




router.post('/update-business-profile', UpdateBusinessProfile);
router.post('/update-business-portfolio', UpdateBusinessPortfolio);



router.post('/add-business-portfolio', AddBusinessPortfolio);
router.post('/add-business-skills', AddBusinessSkills);
router.post('/upload-business-certificate', UploadBusinessCertificate);


router.post('/update-individual-profile', UpdateProfile);


router.post('/add-individual-portfolio', AddPortfolio);
router.post('/add-individual-skill', AddSkills);


router.post('/post-individual-job', DoIndividualPostJob)
router.post('/post-business-job', DoBusinessPostJob)


router.post('/apply-job', ApplyJob);
router.post('/apply-job-business', ApplyJobBusiness);

router.get('/delete-job-application/:id', DeleteJobApplication);








module.exports = router;
