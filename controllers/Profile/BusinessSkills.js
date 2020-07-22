const Skills = require('../../models').Skills;
const Certification = require('../../models').Certification;




module.exports.GetBusinessCompleteSkills = async (req, res, next) => {

    res.render(
        'skills/complete-business-skills',
        {
            page: 'complete-business-skills'
        }
    )
};




module.exports.GetBusinessSkills = async (req, res, next) => {

    res.render(
        'skills/business-skills',
        {
            page: 'business-skills'
        }
    )
};


module.exports.AddBusinessSkills = async (req, res, next) => {


    let userSkills = {
        UserId: req.body.id,
        name: req.body.name
    };



    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/jobfiles/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });

    const upload = multer({
        storage:storage
    }).single('certificate');

    upload(req,res,(err)=>{
        if(err){
            console.log(err.toString());
        }else{
            console.log("document uploaded");
            let userCertification = {
                UserId: req.body.id,
                discipline:req.body.discipline,
                type:req.body.type,
                year:req.body.year
            };
            Certification.create(userCertification).then(response =>{
               //redirect to page
            });
        }
    });
}