const express = require('express');
let router = express.Router();

const { GetAllPostedJob } = require('../controllers/Admin/Job');
const { GetUsers, GetFreelancers, GetClients } = require('../controllers/Admin/User');
const { GetCategories } = require('../controllers/Admin/Settings');
const { GetPayments } = require('../controllers/Admin/Payment');
const { GetSupport } = require('../controllers/Admin/Support');




router.get('/jobs',GetAllPostedJob );
router.get('/users', GetUsers);
router.get('/categories', GetCategories);


router.get('/freelancers', GetFreelancers);
router.get('/clients', GetClients);
router.get('/payment', GetPayments);
router.get('/support', GetSupport);


module.exports = router;
