const express = require('express');
let router = express.Router();

const { GetAllPostedJob } = require('../controllers/Admin/Job');
const { GetUsers } = require('../controllers/Admin/User');
const { GetCategories } = require('../controllers/Admin/Settings');


router.get('/jobs',GetAllPostedJob );
router.get('/users', GetUsers);
router.get('/categories', GetCategories);


module.exports = router;
