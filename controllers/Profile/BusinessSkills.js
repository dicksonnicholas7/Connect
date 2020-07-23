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

    
let skills = req.body.tagsinput;

let skillsArr = skills.split(',');

console.log(skillsArr);

for(i=0;i<skillsArr.length;i++){

    let userSkills = {
        UserId: req.body.id,
        name: skillsArr[i]
    };

    Skills.create(userSkills);
}

    user_skills = await Skills.findAll({where:{UserId:req.body.id}});

    if(user_skills!==null){
        console.log('skills added successfully');

        if(res.locals.user.firstTime){
            res.redirect('/user/complete-business-certificate')
        }else{

        }


    }else{
        console.log('error adding user skills');
    }




}