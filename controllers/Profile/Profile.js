const UserSkills = require('../../models').UserSkills;
const User = require('../../models').User;
const Experience = require('../../models').Experience;
const Portfolio = require('../../models').Portfolio;
const Skills = require('../../models').Skills;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
let secret = "connect";
const path = require('path');
const multer = require('multer'); 
const axios = require('axios');

//render profile page. Also get list of countries from an external api
module.exports.GetIndividualClientProfile = async (req, res, next) => {

            res.render(
                'profile/individual-client',
                {
                    page: 'individual-client-profile'
                }
            )
};

module.exports.GetIndividualFreelancerProfile = async (req, res, next) => {

    let userId = res.locals.user.id;

    let userDetails = await UserAccount.findOne({


        where:{id:userId}, 
        include: [User, UserSkills, Portfolio, Experience]

    });

    console.log(userDetails.Portfolios)
    

    res.render(
        'profile/individual-freelancer',
        {
            userDetails,
            page: 'individual-freelancer'
        }
    )
};




module.exports.GetCompleteClientProfile = async (req, res, next) => {


    let userRole = res.locals.user.RoleId;

    if(userRole === 1){

        
                   //Get list of countries from an external api
                   let country = [];
                   axios.get('https://restcountries.eu/rest/v2/all')
                       .then(response => {
                           country = response.data;
                           req.session.profileChangeMessage = "";
                           res.render(
                            'profile/complete-individual-client-profile',
                            {
                                country,
                                page: 'complete-individual-client-profile'
                            }
                        )
                       })
                       .catch(error => {
                           //api fails, add some countries
                           console.log(error);
                           country = [
                               {name: 'Ghana'},
                               {name: 'Germany'},
                           ];
                           res.render(
                            'profile/complete-individual-client-profile',
                            {
                                country,
                                page: 'complete-individual-client-profile'
                            }
                        )
                       });

    }else{
            console.log('sorry, you are not a client')
    }


};








module.exports.GetCompleteFreelancerProfile = async (req, res, next) => {

let userRole = res.locals.user.RoleId;

if(userRole === 2){
               //Get list of countries from an external api
               let country = [];
               axios.get('https://restcountries.eu/rest/v2/all')
                   .then(response => {
                       country = response.data;
                       req.session.profileChangeMessage = "";
                       res.render(
                        'profile/complete-individual-freelancer-profile',
                        {
                            country,
                            page: 'complete-individual-freelancer-profile'
                        }
                    )
                   })
                   .catch(error => {
                       //api fails, add some countries
                       console.log(error);
                       country = [
                           {name: 'Ghana'},
                           {name: 'Germany'},
                       ];
                       res.render(
                        'profile/complete-individual-freelancer-profile',
                        {
                            country,
                            page: 'complete-individual-freelancer-profile'
                        }
                    )
                   });

}else{
    console.log('sorry, you are not a freelancer')
}



};


module.exports.GetCompleteFreelancerPortfolio = async (req, res, next) => {

    let userRole = res.locals.user.RoleId;

    let check_complete_profile = await User.findOne({where:{UserId:res.locals.user.id}});

    console.log(check_complete_profile.firstname)

    if(userRole === 2 && check_complete_profile.firstname !== '' ){

        res.render(
            'profile/complete-individual-freelancer-portfolio',
            {
                page: 'complete-individual-freelancer-portfolio'
            }
        )
    }else{

        console.log('complete your profile first')
    }


};

module.exports.GetCompleteFreelancerSkills = async (req, res, next) => {

    let userRole = res.locals.user.RoleId;


    let check_complete_portfolio = await Portfolio.findOne({where:{UserId:res.locals.user.id}});

    console.log(check_complete_portfolio)

    if(userRole === 2 && check_complete_portfolio !== null ){
        let skills = await Skills.findAll();

        console.log(skills)
    
        res.render(
            'profile/complete-individual-freelancer-skills',
            {
                skills,
                page: 'complete-individual-freelancer-skills'
            }
        )
    }else{
        console.log('complete your portfolio first')
    }

};




//render profile page if update successful and show response
module.exports.GetProfileSuccess = async (req, res, next) => {
    //Get list of countries from an external api
    let country = [];
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country = response.data;
            res.render(
                'profile/profile',
                {
                    country
                }
            )
        })
        .catch(error => {
            console.log(error);
            country = [
                {name: 'Ghana'},
                {name: 'Germany'},
            ];
            res.render(
                'profile/profile',
                {
                    country
                }
            )
        });
};

//update profile. Will remove picture adding from server side and use js to do it later
module.exports.UpdateProfile = async (req, res, next) => {
    let user_account = await UserAccount.findOne({where:{id:res.locals.user.id} });
    req.session.UserAccount = user_account;



    //use multer to upload file to public/images folder
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/users/individual/',
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
            let userDetails = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                jobtitle: req.body.jobtitle,
                availability: req.body.availability,
                golden_paragraph: req.body.golden_paragraph,
                dob:req.body.dob,
                gender:req.body.gender,
                country: req.body.country,
                city: req.body.city,
                email: req.body.email,
                phone: req.body.phone1 + " " + req.body.phone2 ,
                picture: filenameGlobal
            };

            console.log(userDetails)
            if(filenameGlobal===""){
                delete userDetails.picture
            }
            User.update(userDetails, { where: {UserId:req.body.id} }).then(response =>{
                req.session.profileChangeMessage = response != null;
                UserAccount.findOne({ where:{id:res.locals.user.id}, include: User}).then(rows=>{
                     req.session.user = rows;
                     req.session.individualuser = rows.User;
                     console.log(response);
                     console.log('updated')
                     if(rows.firstTime){
                         if(res.locals.user.RoleId === 2){
                            res.redirect('/user/complete-individual-freelancer-portfolio');
                         }else if(res.locals.user.RoleId === 1){
                             UserAccount.update({firstTime:false}, {where:{id:res.locals.user.id}});
                            res.redirect('/user/dashboard-individual-client');
                         }
                     }else{

                     }

                 });
            });
        }
    });

};

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};