const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const UserAccount = require('../../models').UserAccount;
const User = require('../../models').User;
const JobPayment = require('../../models').JobPayment;
const Chat = require('../../models').Chat;
const Contract = require('../../models').Contract;
const JobReport = require('../../models').JobReport;
const db = require("../../models");
const { QueryTypes } = require('sequelize');
const { jobs } = require("googleapis/build/src/apis/jobs");
const SelectedJobs = require('../../models').SelectedJobs;




module.exports.GetDashboardIndividualClient = async (req, res, next) => {

      let jobs = await Job.findAll({
          where: {ClientId: res.locals.user.id}, 
          include: [
              {  
                  model:JobApplication,
                  as: 'JobApplication'
              }
            
            ]

        });


      let sql =   "SELECT DISTINCT jobapplications.application_status, users.firstname, users.lastname, jobs.job_title, "+
      "jobs.job_status, jobs.updatedAt, jobs.id " +
		"FROM `jobapplications` " +
        	"LEFT JOIN jobs ON jobs.id = jobapplications.JobId " +
        	"LEFT JOIN useraccounts ON jobapplications.FreelanceId = useraccounts.id " +
            "LEFT JOIN users ON users.UserId = jobapplications.FreelanceId ";

            const [jobs_results, metadata] = await db.sequelize.query(sql);


    let allJobsCount = 0;
    let JobsAwardedCount = 0;
    let JobsInProgressCount = 0;
    let JobsCompletedCount =0;

    jobs.map(j => {
        allJobsCount++
    });

    jobs_results.map(j => {
        if(j.application_status === 'awarded' || j.application_status === 'accepted'){
            JobsAwardedCount++
        }
        if(j.job_status === 'in progress'){
            JobsInProgressCount++
        }
        if(j.job_status === 'completed'){
            JobsCompletedCount++
        }    
    });


    res.render(
        'dashboard/dashboard-individual-client',
        {
            jobs,
            allJobsCount,
            JobsAwardedCount,
            JobsInProgressCount,
            JobsCompletedCount,
            jobs_results
        }
    )
}

