const UserSkills = require('../../models').UserSkills;
const Skills = require('../../models').Skills;
const Experience = require('../../models').Experience;
const UserAccount = require('../../models').UserAccount;






module.exports.GetCompleteSkills = async (req, res, next) => {

let skills = Skills.findAll();

console.log(skills)

    res.render(
        'skills/complete-individual-skills',
        {
            skills,
            page: 'complete-individual-skills'
        }
    )
};



module.exports.AddSkills = async (req, res, next ) => {

let userExperience = {
    UserId:req.body.id,
    name:req.body.name,
    years:req.body.years
}

let skills = req.body.skills;

console.log(skills)


for(i=0;i<skills.length;i++){

    let userSkills = {
        UserId: req.body.id,
        SkillsCatId:2,
        name: skills[i]
    };

    UserSkills.create(userSkills);
}

    user_skills = await UserSkills.findAll({where:{UserId:req.body.id}});

    if(user_skills!==null){
        console.log('skills added successfully');

        Experience.create(userExperience);

     user_experience = await Experience.findAll({where:{UserId:req.body.id}});

        if(user_experience !== null){
            UserAccount.update({firstTime:false}, {where:{id:req.body.id}});
            res.redirect('/user/dashboard-individual-freelancer');
        }else{
            console.log('error adding user experience');
        }

    }else{
        console.log('error adding user skills');
    }

}