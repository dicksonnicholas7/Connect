const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;

module.exports.GetBusinessPostJob = async (req, res, next) => {
 
    res.render(
        'job/business-post-job',
        {
            page:'business-post-job'
        }
    );
}; 



module.exports.GetIndividualPostJob = async (req, res, next) => {

    res.render(
        'job/individual-post-job',
        {
            page:'individual-post-job'
        }
    );
};

module.exports.DoPostJob = async (req, res, next) => {

    let hostname = req.headers.host;

    let jobType = 1;

    if(!req.body.freelancers){
        let jobInfo = {
            ClientId: res.locals.user.id,
            title: req.body.title,
            details: req.body.details,
            timeLength: req.body.timeLength,
            price: req.body.price,
            skills: req.body.skills,
            CatId: req.body.category,
            jobType:jobType,
            status:'new'
        };

        console.log(jobType)

        let job_created = await Job.create(jobInfo);
        if(job_created!==null){
            console.log("Job Posted successfully");
            let category = await JobCategory.findAll();
            let freelancers = await User.findAll( {
                include: [
                    {
                        model: UserAccount,
                        as: 'UserAccount',
                        where:{RoleId:2}
                    }
                ]
            });
            res.render(
                'job/post-job',
                {
                    category,
                    freelancers,
                    successMessage:'Job Posted successfully',
                    errorMessage:''
                }
            )
        }else{
            let category = await JobCategory.findAll();
            let freelancers = await User.findAll( {
                include: [
                    {
                        model: UserAccount,
                        as: 'UserAccount',
                        where:{RoleId:2}
                    }
                ]
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
            let freelancers = await User.findAll( {
                include: [
                    {
                        model: UserAccount,
                        as: 'UserAccount',
                        where:{RoleId:2}
                    }
                ]
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
                    title: req.body.title || '',
                    details: req.body.details || '',
                    timeLength: req.body.timeLength || '',
                    price: req.body.price || '',
                    skills: req.body.skills || '',
                    CatId: req.body.category || '',
                    jobType:jobType
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
                    title: res.locals.user.firstname+"Selected to View Posted Job",
                    message: '<div style="background-color:white;color:black;">'+
                             '<p style="font-weight: bold;">Group 3 freelancer.</p>'+ 
                             '<p>Hi, '+req.session.user.firstname+ ' selected you to view a job he/she posted.</p>'+
                            '<p><a href="http://'+hostname+'/login/'+'">Click here to login and view the job</a></p></div>',
                    ReceiverEmail: freelancerInfo.email
                };

                NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);
              
                console.log('email sent to ' + freelancerInfo.email );

        }

        if(job_created!==null){
            console.log("Job Posted successfully");
            let category = await JobCategory.findAll();
            let freelancers = await User.findAll( {
                include: [
                    {
                        model: UserAccount,
                        as: 'UserAccount',
                        where:{RoleId:2}
                    }
                ]
            });
            res.render(
                'job/post-job',
                {
                    category,
                    freelancers,
                    successMessage:'Job Posted successfully and Email sent to selected freelancers',
                    errorMessage:''
                }
            )
        }else{
            let category = await JobCategory.findAll();
            let freelancers = await User.findAll( {
                include: [
                    {
                        model: UserAccount,
                        as: 'UserAccount',
                        where:{RoleId:2}
                    }
                ]
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

            
        }

    }

};
