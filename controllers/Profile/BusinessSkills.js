const UserSkills = require('../../models').UserSkills;
const Experience = require('../../models').Experience;
const UserAccount = require('../../models').UserAccount;
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

    console.log(req.body.skills)
    
let skills = req.body.skills;

let skillsArr = skills.split(',');

console.log(skillsArr);

for(i=0;i<skillsArr.length;i++){

    let userSkills = {
        UserId: req.body.id,
        name: skillsArr[i]
    };

    UserSkills.create(userSkills);
}

        console.log('skills added successfully');

        if(res.locals.user.firstTime){
            res.redirect('/user/complete-business-certificate')
        }
}