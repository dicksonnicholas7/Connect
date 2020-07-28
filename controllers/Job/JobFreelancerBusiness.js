const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobApplication = require('../../models').JobApplication;
const JobCategory = require('../../models').JobCategory;
const User = require('../../models').User;
const BusinessUser = require('../../models').BusinessUser;
const UserAccount = require('../../models').UserAccount;
const Contract = require('../../models').Contract;
const {Notify, NotifyMail} = require('../../services/Notification');
const db = require("../../models");
const {GetDashboard} = require('../Dashboard/DashboardIndividualFreelancer');
const {GetDashboardB} = require('../Dashboard/DashboardBusinessFreelancer');







module.exports.GetSingleJobDetailBusiness = async (req, res, next ) => {
    
    let response = {
    }

    let jobId = req.params.id;

    let jobdetails = await Job.findOne({where:{
        [Op.and]: [

                {id:jobId},
                {job_UserType:'business'}
        ]
    }});

    let client = await BusinessUser.findOne({where:{UserId:jobdetails.ClientId}});

    response = { job:jobdetails, user:client} 

    res.send(response);
}











module.exports.ApplyJobBusiness = async (req, res, next) => {

    console.log(req.body.id)

    let error = '';
    
    let hostname = req.headers.host;
    let appInfo = {
        JobId: req.body.id,
        FreelanceId: res.locals.user.id,
        application_status:'pending'
    };


    let check_application = await JobApplication.findOne({where:{
        [Op.and]: [

                {FreelanceId:res.locals.user.id},
                {JobId:req.body.id }
        ]
    }});


    console.log(check_application)

    if(check_application !== null){

        error = 'You have already applied for this Job.'

        let sql = "SELECT jobs.id, jobs.job_details, jobs.job_title, jobs.createdAt, jobs.job_price, jobs.job_skills,  businessusers.businessname, businessusers.city, users.country "+ 
        "FROM jobs "+
        "LEFT JOIN useraccounts ON useraccounts.id = jobs.ClientId "+
        "LEFT JOIN users ON useraccounts.id = businessusers.UserId ";
    
        const [jobs, metadata] = await db.sequelize.query(sql);
    
        console.log(jobs)
        console.log(jobs.id)
     
        res.render(
            'job/jobs',
            {
                applyErrorMessage:error,
                jobs,
                page: 'all-jobs'
            }
        );

    }else{


    
    const job_created= await JobApplication.create(appInfo);
    let jobOwnerInfo = await Job.findOne({ where:{id: appInfo.JobId}, include: UserAccount });

    let clientInfo = await BusinessUser.findOne({ where:{UserId:jobOwnerInfo.UserAccount.id}});
    let freelancerInfo = await BusinessUser.findOne({ where:{UserId:res.locals.user.id}});

    // let notifyParts = {
    //     title: freelancerInfo.firstname +" applied for a job you posted",
    //     message: "/user/my-jobs/all",
    //     ReceiverId: jobOwnerInfo.ClientId
    // };


    let notifyMailParts = {
        title: freelancerInfo.firstname  +" applied for a job you posted",
        message: '<div style="background-color:white;color:black;">'+
                 '<p style="font-weight: bold;">Connect.</p>'+ 
                 '<p>Congratulations,  ' + freelancerInfo.businessname  + '  applied for a job you posted.</p>'+
                '<p><a href="http://'+hostname+'/login/'+'">Click here to login</a></p></div>',
        ReceiverEmail: jobOwnerInfo.UserAccount.email
    };



    // Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);



    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);


    console.log('job successfully applied')

    error = '';
    let success = 'job successfully applied'


    GetDashboardB(req, res, next, error, success)



}
};









module.exports.GetJobByIdBusiness = async (req, res, next ) => {

    let job_id = req.params.id;

    

    let job = await Job.findOne({where:{
        [Op.and]: [

                {id:job_id},
                {job_UserType:'business'}
        ]
    }})


    let sql = "SELECT jobs.*, businessusers.businessname, businessusers.city, businessusers.country "+ 
        "FROM jobs "+
        "LEFT JOIN useraccounts ON useraccounts.id = jobs.ClientId "+
        "LEFT JOIN users ON useraccounts.id = businessusers.UserId " +
        "where jobs.job_UserType = 'business'"

     let user = await User.findOne({where:{UserId:job.ClientId}});

     const [jobs, metadata] = await db.sequelize.query(sql);
  

     let job_details = {
        id:job_id,
        title:job.job_title,
        firstname:user.firstname,
        lastname:user.lastname,
        country:user.country,
        city:user.city,
        details:job.job_details,
        price:job.job_price,
        skills:job.job_skills
    }


    console.log(job_details)

     res.render(
         'job/jobs',
         {
            applyErrorMessage:'',
             job_details,
             jobs,
             page: 'single-jobs'
         }
     )

}


module.exports.GetAllJobsFreelancerBusiness = async (req, res, next) =>{


    let sql = "SELECT jobs.*,  businessusers.firstname, businessusers.city, businessusers.country "+ 
        "FROM jobs "+
        "LEFT JOIN useraccounts ON useraccounts.id = jobs.ClientId "+
        "LEFT JOIN users ON useraccounts.id = businessusers.UserId " +
        "where jobs.job_UserType = 'business'";

        const [jobs, metadata] = await db.sequelize.query(sql);

        console.log(jobs)
        console.log(jobs.id)
     
        res.render(
            'job/jobs',
            {
                applyErrorMessage:'',
                jobs,
                page: 'all-jobs'
            }
        )
}






module.exports.GetJobsFilterFreel = async (req, res, next)=>{
    let jobs = {};
    let searchResult = "";
    if(req.body.filter_date!==null && req.body.filter_price_min && req.body.filter_price_max){
        jobs = await Job.findAll({
            where: {
                [Op.and]: [
                    {
                        price:{
                            [Op.between]:
                                [parseFloat(req.body.filter_price_min), parseFloat(req.body.filter_price_max)]                       
                        }
                },
                    {createdAt: req.body.filter_date}
                ]
            },
            include: [
                {
                    model: JobCategory,
                    as: 'JobCategory'
                },
                {
                    model: User,
                    as: 'User'
                }
            ],
        });
        searchResult = "";
    }else{
        jobs = await Job.findAll({
            where: {
                price:{
                    [Op.between]:
                        [parseFloat(req.body.filter_price_min), parseFloat(req.body.filter_price_max)]                        
                }              
            },
            include: [
                {
                    model: JobCategory,
                    as: 'JobCategory'
                },
                {
                    model: User,
                    as: 'User'
                }
            ],
        });
        searchResult = "";
    }

    let category = await JobCategory.findAll();
    let jobCount = await Job.count();
    res.render(
        'job/jobs_all',
        {
            jobs,
            jobCount,
            category,
            searchResult,
            page: 'jobs',
            page_no: 1
        }
    )
};

module.exports.SingleJobDetail = async (req, res, next) => {
    let jobId = req.params.id;
    let job = await Job.findOne({
        where:{id:jobId},
        include: [
            {
                model: JobCategory,
                as: 'JobCategory'
            },
            {
                model: User,
                as: 'User'
            }
        ]
    });
    let related_jobs = await Job.findAll( {
        where:{CatId:job.CatId},
        include: [
            {
                model: JobCategory,
                as: 'JobCategory'
            },
            {
                model: User,
                as: 'User'
            }
        ],
        limit: 2
    });
    let user_applied = false;
    let user_application = {};
    if(!req.session.loggedIn){

    }else {
        user_application = await JobApplication.findOne({
            where: {
                [Op.and]: [
                    {JobId: jobId},
                    {FreelanceId: res.locals.user.id}
                ]
            }
        });
        if (user_application) {
            user_applied = true;
        }
    }
    res.render(
        'job/job-view',
        {
            job,
            related_jobs,
            user_application,
            user_applied,
            page:'jobs'
        }
    )
};

module.exports.GetAppliedJobs = async (req, res, next) => {
    let jobCat = req.params.category;
    let title = "Applied Jobs";
    let jobApps = await JobApplication.findAll({where: {FreelanceId: res.locals.user.id}, include:Job });
    if (jobCat === "all") {
        jobApps = await JobApplication.findAll({where: {FreelanceId: res.locals.user.id}, include:Job });
    } else if (jobCat === "awarded") {
        jobApps = await JobApplication.findAll({
            where: {
                [Op.and]: [
                    {FreelanceId: res.locals.user.id},
                    {
                        [Op.or]:[
                            {status: 'awarded'},
                            {status: 'accepted'}
                        ]
                    }
                ]
            },
            include:Job
        });
        title = "Awarded Jobs";
    } else if (jobCat === "accepted") {
        jobApps = await JobApplication.findAll({
            where: {
                [Op.and]: [
                    {FreelanceId: res.locals.user.id},
                    {status: 'accepted'}
                ]
            },
            include:Job
        });
        title = "Accepted Jobs";
    }
    console.log(jobApps);
    res.render(
        'job/freelancer-jobs',
        {
            jobApps,
            title
        }
    )
};




module.exports.AcceptJobBusiness = async (req, res, next) => {
    let appId = req.params.id;


    let applicant_details = await BusinessUser.findOne({where:{UserId:res.locals.user.id}});



    let hostname = req.headers.host;
    let job_awarded = await JobApplication.update({application_status:'accepted'},{where:{id:appId} });
    let job_just_awarded = await JobApplication.findOne({ where:{id:appId} });
    let job = await Job.findOne({where:{id:job_just_awarded.JobId}, include:UserAccount });


    let jobContract = {
        JobId: job.id,
        contract_status: 'start'
    }; 


    let job_contract = await Contract.create(jobContract);

    if(job_contract !== null ){
        Job.update({job_status:'in progress'}, {where:{id:job_contract.JobId}});
    }

    // let notifyParts = {
    //     title: res.locals.user.firstname+" accepted the job",
    //     message: "/user/my-jobs/awarded",
    //     ReceiverId: job.ClientId
    // };


    let notifyMailParts = {
        title: applicant_details.businessname+" accepted the job",
        message: '<div style="background-color:white;color:black;">'+
                 '<p style="font-weight: bold;">Connect</p>'+ 
                 '<p>Congratulations'+applicant_details.businessname+ 'accepted the awarded job.</p>'+
                '<p><a href="http://'+hostname+'/login/'+'">Click here to login</a></p></div>',
        ReceiverEmail: job.UserAccount.email
    };


    // Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);
    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);

    res.redirect('/user/dashboard-business-freelancer');
};










module.exports.RejectJob = async (req, res, next) => {
    let hostname = req.headers.host;
    let appId = req.params.id;
    let jobAppStatus = {
        status:''
    };
   
    let job = await JobApplication.findOne({where:{id:appId},include:User });
    let job_updated = await Job.update(jobAppStatus, {where: {id:job.JobId} });
    let jobApp_rejected = await JobApplication.destroy({where:{id:appId} });

    let notifyParts = {
        title: res.locals.user.firstname+" rejected the job",
        message: "/user/my-jobs/all",
        ReceiverId: job.ClientId
    };
    let notifyMailParts = {
        title: res.locals.user.firstname+" rejected the job",
        message: '<div style="background-color:white;color:black;">'+
                 '<p style="font-weight: bold;">Group 3 freelancer.</p>'+ 
                 '<p>Sorry '+res.locals.user.firstname+ ' rejected the awarded job.</p>'+
                '<p><a href="http://'+hostname+'/login/'+'">Click here to see other applicants</a></p></div>',
        ReceiverEmail: job.User.email
    };
    Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);
    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);

    res.redirect('/job/'+job.JobId);
};
