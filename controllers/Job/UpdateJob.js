const Job = require('../../models').Job;
const JobSkills = require('../../models').JobSkills;
const JobApplication = require('../../models').JobApplication;
const db = require("../../models");
const { QueryTypes } = require('sequelize');


module.exports.GetSingleJob = async (req, res, next ) => {

    let jobId = req.params.id;

    let job_skills;


    job_skills = await JobSkills.findAll({where:{JobId:jobId}}); 




let job = await Job.findOne({where:{id:jobId}});

let sql = "SELECT DISTINCT jobapplications.id, users.firstname, users.lastname, users.UserId, users.jobtitle, users.country, users.city, users.picture " +
		"FROM `jobapplications` " +
        	"LEFT JOIN jobs ON jobs.id = jobapplications.JobId " + 
        	" LEFT JOIN useraccounts ON jobapplications.FreelanceId = useraccounts.id  " +
            "LEFT JOIN users ON users.UserId = jobapplications.FreelanceId  " + 
            "WHERE jobapplications.JobId = " + jobId;

            const [applicants, metadata] = await db.sequelize.query(sql);
  
    res.render(
        'job/job-view',
        {
            applicants,
            job,
            job_skills,
            page:'job-view'
        }
    )
}


module.exports.UpdateJob = async (req, res, next) => {
    let jobInfo = {
        title: req.body.title || '',
        details: req.body.details || '',
        timeLength: req.body.timeLength || '',
        price: req.body.price || '',
        skills: req.body.skills || '',
        CatId: req.body.category || ''
    };

    let job_updated = await Job.update(jobInfo, { where:{id:req.body.id} });
    if(job_updated!==null){
        console.log("Job Updated successfully");
        res.send("success");
    }else{
        console.log("Error creating account ");
        res.send("Error Updating Jb Details");
    }
};

module.exports.DeleteJob = async (req, res, next) => {
    let jobId = req.body.id;
    let jobApp_deleted = await JobApplication.destroy({where:{JobId:jobId}});
    let job_deleted = await Job.destroy({where:{id:jobId}});
    if(job_deleted !== null && jobApp_deleted !== null) {
        res.send("success");
    }else{
        res.send("error");
    }
};
