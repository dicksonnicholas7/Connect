const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Portfolio = require('../../models').Portfolio;
const Contract = require('../../models').Contract;
const {Notify, NotifyMail} = require('../../services/Notification');



module.exports.GetSingleJob = async (req, res, next) => {
    let jobId = req.params.id;
    let category = await JobCategory.findAll();
    let job = await Job.findOne( {where: {id:jobId}, include:JobCategory });
    let jobDetail = await JobApplication.findAll({
        where: {JobId: jobId},
        include: User
    });
    let job_contract = await Contract.findOne({ where:{JobId:jobId} });
    let jobAppAwardId = 0;
    jobDetail.map(app=>{
       if((app.status==='awarded' || app.status==='accepted') && job_contract){
           jobAppAwardId = app.id;
       }
    });
    console.log("Job app id: "+jobAppAwardId);
    res.render(
        'job/view-single-job',
        {
            job,
            category,
            jobDetail,
            jobAppAwardId
        }
    )
};



module.exports.GetFreelancerProfile = async (req, res, next) =>{
    let freelanceId = req.params.id;
    let user_portfolio = await Portfolio.findOne({where:{UserId:freelanceId}, include:User});
    res.send(user_portfolio);
}




module.exports.AwardJob = async (req, res, next) => {
    let appId = req.params.id;

    let hostname = req.headers.host;
    let job_awarded = JobApplication.update({application_status:'awarded'},{where:{id:appId} });
    let JobApp = await JobApplication.findOne({where:{id:appId}, include:UserAccount });
    let job_updated = Job.update({job_status:'awarded'}, {where: {id:JobApp.JobId} });
    let jobOwnerInfo = await Job.findOne({ where:{id:JobApp.JobId}, include: UserAccount });

    // let notifyParts = {
    //     title: jobOwnerInfo.title+" has been awarded to you",
    //     message: "/user/freelancer-jobs/awarded",
    //     ReceiverId: JobApp.FreelanceId
    // };

    let notifyMailParts = {
        title: jobOwnerInfo.job_title+" has been awarded to you",
        message: '<div style="background-color:white;color:black;">'+
                 '<p style="font-weight: bold;">Connect</p>'+ 
                 '<p>Congratulations, '+jobOwnerInfo.job_title+ ' has been awarded to you. Click on the following link to see.</p>'+
                '<p><a href="http://'+hostname+'/login/'+'">Login to accept</a></p></div>',
        ReceiverEmail: JobApp.UserAccount.email
    };
    // Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);
    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);

    console.log('job awarded successfully');

    res.redirect('/user/dashboard-individual-client');
};
