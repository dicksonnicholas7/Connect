const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;
const JobPayment = require('../../models').JobPayment;
const Chat = require('../../models').Chat;
const Contract = require('../../models').Contract;
const JobReport = require('../../models').JobReport;
const Notification = require('../../models').Notification;;
const { QueryTypes } = require('sequelize');
const SelectedJobs = require('../../models').SelectedJobs;
const db = require("../../models");


    

module.exports.GetDashboardIndividualFreelancer = async (req, res, next) => {


    let userRole = res.locals.user.RoleId;


    if(userRole === 2){

        

        let sql = "SELECT jobs.*, users.firstname, users.lastname, useraccounts.id " +
"FROM `jobs` "  +
"LEFT JOIN useraccounts ON useraccounts.id = jobs.ClientId " +
"LEFT JOIN users ON users.UserId = useraccounts.id ";


const [jobs, metadata] = await db.sequelize.query(sql);

    let jobsAppCount = JobApplication.findAll({ 
        where:{FreelanceId:res.locals.user.id}
    });



    let jobsInproCount = JobApplication.findAll({ 
        where:{
            [Op.and]: [
                {FreelanceId:res.locals.user.id},
                {application_status:'in progress'}
            ]
        }
    });


    let jobsCompCount = JobApplication.findAll({ 
        where:{
            [Op.and]: [
                {FreelanceId:res.locals.user.id},
                {application_status:'completed'}
            ]
        }
    });



    let jobsAwarded = await JobApplication.findAll({
        where:{
            [Op.and]: [
                {FreelanceId:res.locals.user.id},
                {
                    [Op.or]:[
                        {application_status: 'awarded'},
                        {application_status: 'accepted'}
                    ]
                }
            ]
        },
        include: [
            {
                model: Job,
                as: 'Job'
            }
        ]
    });


    console.log(" awarded "+jobsAwarded)


    let jobApps = await JobApplication.findAll({
        where:{FreelanceId: res.locals.user.id},
        include: [
            {
                model: Job,
                as: 'Job',
            }
        ]
    });




    let jobAppCount = 0;
    let jobAwarded = 0;
    let jobInproCount = 0;
    let jobCompCount = 0;


    jobsCompCount.map(jb=>{
        jobCompCount++;
    });


    jobsInproCount.map(jb=>{
        jobInproCount++;
    });

    jobsAppCount.map(jb=>{
        jobAppCount++;
    });


    jobsAwarded.map(jsa =>{
        jobAwarded++;
    });



    JobApplication.findAndCountAll({
        where:{
            [Op.and]:[
                {application_status: 'pending'},
                {FreelanceId: res.locals.user.id},
            ]
        }
    }).then(result=>{
        let jobDoneCount = result.count;

        res.render(
            'dashboard/dashboard-individual-freelancer',
            {
                error: '',
                success:'',
                page:'dashboard-individual-freelancer',
                jobAppCount,
                jobAwarded,
                jobDoneCount,
                jobCompCount,
                jobApps,
                jobInproCount,
                jobsInproCount,
                jobsAwarded,
                jobsCompCount,
                jobs
            }
        )
    }).catch(err=>{
        console.log(err);
    });

    }else{
        console.log('either not completed profile or you are not a freelancer')
    }
}



module.exports.GetDashboard = async (req, res, next, error, success) => {

    let sql = "SELECT jobs.*, users.firstname, users.lastname, useraccounts.id " +
    "FROM `jobs` "  +
    "LEFT JOIN useraccounts ON useraccounts.id = jobs.ClientId " +
    "LEFT JOIN users ON users.UserId = useraccounts.id ";

    const [jobs, metadata] = await db.sequelize.query(sql);

    console.log(jobs)

    let jobsAppCount = JobApplication.findAll({ 
        where:{FreelanceId:res.locals.user.id}
    });



    let jobsInproCount = JobApplication.findAll({ 
        where:{
            [Op.and]: [
                {FreelanceId:res.locals.user.id},
                {application_status:'in progress'}
            ]
        }
    });


    let jobsCompCount = JobApplication.findAll({ 
        where:{
            [Op.and]: [
                {FreelanceId:res.locals.user.id},
                {application_status:'completed'}
            ]
        }
    });



    let jobsAwarded = await JobApplication.findAll({
        where:{
            [Op.and]: [
                {FreelanceId:res.locals.user.id},
                {
                    [Op.or]:[
                        {application_status: 'awarded'},
                        {application_status: 'accepted'}
                    ]
                }
            ]
        },
        include: [
            {
                model: Job,
                as: 'Job'
            }
        ]
    });


    console.log(" awarded "+jobsAwarded)


    let jobApps = await JobApplication.findAll({
        where:{FreelanceId: res.locals.user.id},
        include: [
            {
                model: Job,
                as: 'Job',
            }
        ]
    });




    let jobAppCount = 0;
    let jobAwarded = 0;
    let jobInproCount = 0;
    let jobCompCount = 0;


    jobsCompCount.map(jb=>{
        jobCompCount++;
    });


    jobsInproCount.map(jb=>{
        jobInproCount++;
    });

    jobsAppCount.map(jb=>{
        jobAppCount++;
    });


    jobsAwarded.map(jsa =>{
        jobAwarded++;
    });



    JobApplication.findAndCountAll({
        where:{
            [Op.and]:[
                {application_status: 'pending'},
                {FreelanceId: res.locals.user.id},
            ]
        }
    }).then(result=>{
        let jobDoneCount = result.count;

        res.render(
            'dashboard/dashboard-individual-freelancer',
            {
                error:error,
                success:success,
                page:'dashboard-individual-freelancer',
                jobAppCount,
                jobAwarded,
                jobDoneCount,
                jobCompCount,
                jobApps,
                jobInproCount,
                jobsInproCount,
                jobsAwarded,
                jobsCompCount,
                jobs
            }
        )
    }).catch(err=>{
        console.log(err);
    });
};



module.exports.GetJobCount = async (req, res, next) => {
    
        let jobsAppCount = await JobApplication.findAll({ 
            where:{FreelanceId:res.locals.user.id}
        });
    
    
    
        let jobsInproCount = await JobApplication.findAll({ 
            where:{
                [Op.and]: [
                    {FreelanceId:res.locals.user.id},
                    {application_status:'in progress'}
                ]
            }
        });
    
    
        let jobsCompCount = await JobApplication.findAll({ 
            where:{
                [Op.and]: [
                    {FreelanceId:res.locals.user.id},
                    {application_status:'completed'}
                ]
            }
        });
    
    
    
        let jobsAwarded = await JobApplication.findAll({
            where:{
                [Op.and]: [
                    {FreelanceId:res.locals.user.id},
                    {
                        [Op.or]:[
                            {application_status: 'awarded'},
                            {application_status: 'accepted'}
                        ]
                    }
                ]
            },
            include: [
                {
                    model: Job,
                    as: 'Job'
                }
            ]
        });
    
    
        console.log(" awarded "+jobsAwarded)
    
    
    
        let jobAppCount = 0;
        let jobAwarded = 0;
        let jobInproCount = 0;
        let jobCompCount = 0;
    
    
        jobsCompCount.map(jb=>{
            jobCompCount++;
        });
    
    
        jobsInproCount.map(jb=>{
            jobInproCount++;
        });
    
        jobsAppCount.map(jb=>{
            jobAppCount++;
        });
    
    
        jobsAwarded.map(jsa =>{
            jobAwarded++;
        });


        let jobCount = {
            jobsAwarded: jobAwarded,
            jobsCompleted: jobCompCount,
            jobsInProgress: jobInproCount,
            jobsApplied: jobAppCount
        };


        res.json(jobCount);
    
    

}
