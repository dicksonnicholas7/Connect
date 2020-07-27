const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const UserAccount = require('../../models').UserAccount;
const User = require('../../models').User;





module.exports.GetIndividualPostJob = async (req, res, next) => {

    let freelancers = await UserAccount.findAll({
        where: {
            [Op.and]: [
                {RoleId:2},
                {UserTypeId:2}
            ]
        },
        include: [User]
    });

    let category = await JobCategory.findAll();

    
    res.render(
        'job/individual-post-job',
        {
            category,
            freelancers,
            successMessage:'',
            errorMessage:''
        }
    );
};



module.exports.DoIndividualPostJob = async (req, res, next) => {

    let hostname = req.headers.host;

    let jobType = 1;

    

    if(!req.body.freelancers){

        let jobInfo = {
            ClientId: res.locals.user.id,
            job_title: req.body.title,
            job_details: req.body.details,
            job_timeLength: req.body.timeLength_number + req.body.timeLength_period,
            job_price: req.body.price,
            job_skills: req.body.skills,
            job_CatId: req.body.category,
            job_jobType:jobType,
            job_UserType:'individual',
            job_status:'new'
        };

        console.log(jobType)

        let job_created = await Job.create(jobInfo);
        if(job_created!==null){
            console.log("Job Posted successfully");
            let category = await JobCategory.findAll();
            let freelancers = await UserAccount.findAll( {
                where: {
                    [Op.and]: [
                        {RoleId:2},
                        {UserTypeId:2}
                    ]
                },
                include: [User]
            });
            res.render(
                'job/individual-post-job',
                {
                    category,
                    freelancers,
                    successMessage:'Job Posted successfully',
                    errorMessage:''
                }
            )
        }else{
            let category = await JobCategory.findAll();
            let freelancers = await UserAccount.findAll( {
                where: {
                    [Op.and]: [
                        {RoleId:2},
                        {UserTypeId:2}
                    ]
                },
                include: [User]
            });
            console.log("Error posting job");
            res.render(
                'job/post-job',
                {
                    category,
                    freelancers,
                    errorMessage:'Error Posting Job',
                    successMessage:''
                }
            );
        }
    }else{
        if(req.body.freelancers.length === 36){
            jobType = 1;

            let category = await JobCategory.findAll();
            let freelancers = await UserAccount.findAll( {
                where: {
                    [Op.and]: [
                        {RoleId:2},
                        {UserTypeId:2}
                    ]
                },
                include: [User]
            });
            res.render(
                'job/post-job',
                {
                    category,
                    freelancers,
                    errorMessage:'Error : Freelancers to view the posted job must be 2 or more',
                    successMessage:''
                }
            );
        }else{

            jobType = 2;

            let job_created = {};

            for(i=0;i<req.body.freelancers.length;i++){

                let freelancerInfo = await User.findOne({where:{id:req.body.freelancers[i]}});

                let jobInfo = {
                    ClientId: res.locals.user.id,
                    job_title: req.body.title,
                    job_details: req.body.details,
                    job_timeLength: req.body.timeLength_number +' '+ req.body.timeLength_period,
                    job_price: req.body.price,
                    job_skills: req.body.skills,
                    CatId: req.body.category,
                    job_jobType:jobType,
                    job_UserType:'individual',
                    job_status:'new'
                };
        
                let job_created = await Job.create(jobInfo);

                if(job_created!==null){
                    let selectedJobInfo = {
                        ClientId: res.locals.user.id,
                        FreelancerId: req.body.freelancers[i],
                        JobId: job_created.id
                    }

                    selectedJobCreated = await SelectedJobs.create(selectedJobInfo);
                }

                console.log(job_created)
                console.log(freelancerInfo)   

                console.log(freelancerInfo.email);

;
                let notifyMailParts = {
                    title: res.locals.user.User.firstname+"Selected to View Posted Job",
                    message: '<div style="background-color:white;color:black;">'+
                             '<p style="font-weight: bold;">Group 3 freelancer.</p>'+ 
                             '<p>Hi, '+req.session.user.User.firstname+ ' selected you to view a job he/she posted.</p>'+
                            '<p><a href="http://'+hostname+'/login/'+'">Click here to login and view the job</a></p></div>',
                    ReceiverEmail: freelancerInfo.email
                };

                NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);
              
                console.log('email sent to ' + freelancerInfo.email );

        }

        if(job_created!==null){
            console.log("Job Posted successfully");
            let category = await JobCategory.findAll();
            let freelancers = await UserAccount.findAll( {
                where: {
                    [Op.and]: [
                        {RoleId:2},
                        {UserTypeId:2}
                    ]
                },
                include: [User]
            });
            res.render(
                'job/individual-post-job',
                {
                    category,
                    freelancers,
                    successMessage:'Job Posted successfully and Email sent to selected freelancers',
                    errorMessage:''
                }
            )
        }else{
            let category = await JobCategory.findAll();
            let freelancers = await UserAccount.findAll( {
                where: {
                    [Op.and]: [
                        {RoleId:2},
                        {UserTypeId:2}
                    ]
                },
                include: [User]
            });
            res.render(
                'job/individual-post-job',
                {
                    category,
                    freelancers,
                    successMessage:'',
                    errorMessage:'Error Posting Job'
                }
            )
        }

            
        }

    }

};
