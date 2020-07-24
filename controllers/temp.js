const JobCategory = require('../models').JobCategory;
const UserSkills = require('../models').UserSkills;

module.exports.GetJobCat = async (req, res, next) => {

    res.render(
        
        'job-category',
        {
            success:'',
            error:''
        }
        
        );
}



module.exports.GetSkills = async (req, res, next) => {
    res.render(
        'skills',
    {
        success:'',
        error:''
    });
}


module.exports.PostSkills = async (req, res, next) => {

    let user_skills = {

    }
 
}


module.exports.PostJobCategory = async (req, res, next) => {


    //use multer to upload file to public/images folder
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/users/category/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });

    const upload = multer({
        storage:storage
    }).single('picture');

    upload(req,res,(err)=>{
        if(err){
            console.log(err.toString());
        }else{
            
            console.log("uploaded");
            let catDetails = {
                name: req.body.name,
                picture: filenameGlobal
            };

            console.log(catDetails)
            if(filenameGlobal===""){
                delete catDetails.picture
            }
            let Job_Category = JobCategory.create(catDetails);

            if(Job_Category !== null){

                console.log('category inserted successfully')
 
                res.render(
                    'job-category',
                    {
                         error:'',
                         success:'Successfully Added Job Category'
                    }
                    );
            }else{
                console.log('error')
 
                res.render(
                 'job-category',
                 {
                      error:'error adding Job Category',
                      success:''
                 }
                 );
            }
        }
    });

}