const express = require('express');
let router = express.Router();
const {GetLogin, DoLogin, Logout} = require('../controllers/Auth/Login');
const { GetSignUp, DoSignUp, GetBusinessSignUp, DoBusinessSignUp } = require('../controllers/Auth/SignUp');
const { GetSignUpPage } = require('../controllers/SignUpPage');
const {GetForgotPassword, GetResetPassword,
        forgotPasswordEmail, DoResetPassword,GetReset
        } = require('../controllers/Auth/ForgotPassword');
const { ApplyJob } = require('../controllers/Job/JobFreelancer');
const {GetVerify, DoVerification, SendVerificationAgain, NotVerified} = require('../controllers/Auth/Verify');
const {GetHowItWorks} = require('../controllers/Public');
const {GetComingSoonUpPage} = require('../controllers/ComingSoon');
const { GetFreelancers, GetSingleFreelancer, GetFreelancerCountryAndSearch } = require('../controllers/Freelancer/FreelancersPublic');
const {GetJobs} = require('../controllers/Job/JobPublic');
const {GetPublicFreelancers} = require('../controllers/Freelancer/FreelancersPublic')
const {GetPublicClients} = require('../controllers/Client/ClientPublic')
const {GetPublicJobs} = require('../controllers/Job/JobPublic')

//Public routes
// GET requests

router.get('/jobs', GetJobs);
router.get('/', GetComingSoonUpPage);

router.get('/find-freelancers', GetPublicFreelancers);
router.get('/find-clients', GetPublicClients);
router.get('/find-jobs', GetPublicJobs);


router.get('/freelancers', GetFreelancers);
router.get('/freelancer/:id', GetSingleFreelancer);

router.get('/how-it-works', GetHowItWorks);
router.get('/login', GetLogin);
router.get('/signup/:type', GetSignUp);
router.get('/signup-page', GetSignUpPage);
router.get('/logout', Logout);
router.get('/forgot-password', GetForgotPassword);
router.get('/reset-password/:token/:email', GetResetPassword);
router.get('/reset', GetReset);
router.get('/verify', GetVerify);
router.get('/send-verification', SendVerificationAgain);
router.get('/verification/:email/:token', DoVerification);
router.get('/coming-soon', GetComingSoonUpPage);



//router.get('/jobs',GetAllJobs);
//router.get('/jobs/:page',GetPageAllJobs);
//router.get('/job/:id', JobDetail);
router.get('/job-apply/:id', ApplyJob);



//POST requests
router.post('/signup/:type', DoSignUp);
router.post('/login', DoLogin);
router.post('/forgot-password', forgotPasswordEmail);
router.post('/reset-password', DoResetPassword);
//router.post('/jobs', GetJobsCategoryAndSearch);
//router.post('/freelancers', GetFreelancerCountryAndSearch);
//router.post('/filter-jobs', GetJobsFilter);


module.exports = router;
