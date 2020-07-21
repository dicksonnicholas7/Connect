const UserAccount = require('../../models').UserAccount;
const BusinessUser = require('../../models').BusinessUser;
const crypto = require('crypto');
let secret = "group3";
const path = require('path');
const multer = require('multer');
const axios = require('axios');


module.exports.GetBusinessClientCompleteProfile = async (req, res, next) => {

       //Get list of countries from an external api
       let country = [];
       axios.get('https://restcountries.eu/rest/v2/all')
           .then(response => {
               country = response.data;
               req.session.profileChangeMessage = "";
               res.render(
                'profile/complete-business-client-profile',
                {
                    country,
                    page: 'complete-business-client-profile'
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
                'profile/complete-business-client-profile',
                {
                    country,
                    page: 'complete-business-client-profile'
                }
            )
           });
};

module.exports.GetBusinessFreelancerCompleteProfile = async (req, res, next) => {

           //Get list of countries from an external api
           let country = [];
           axios.get('https://restcountries.eu/rest/v2/all')
               .then(response => {
                   country = response.data;
                   req.session.profileChangeMessage = "";
                   res.render(
                    'profile/complete-business-freelancer-profile',
                    {
                        country,
                        page: 'complete-business-freelancer-profile'
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
                    'profile/complete-business-freelancer-profile',
                    {
                        country,
                        page: 'complete-business-freelancer-profile'
                    }
                )
               });


    
};


module.exports.GetBusinessFreelancerCompletePortfolio = async (req, res, next) => {

    //Get list of countries from an external api
    let country = [];
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country = response.data;
            req.session.profileChangeMessage = "";
            res.render(
             'profile/complete-business-freelancer-portfolio',
             {
                 country,
                 page: 'complete-business-freelancer-portfolio'
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
             'profile/complete-business-freelancer-profile',
             {
                 country,
                 page: 'complete-business-freelancer-profile'
             }
         )
        });



};


module.exports.GetBusinessFreelancerCompleteSkills = async (req, res, next) => {


            res.render(
             'profile/complete-business-freelancer-skills',
             {
                 page: 'complete-business-freelancer-skills'
             }
         );
        

};




module.exports.GetBusinessFreelancerProfile = async (req, res, next) => {

    res.render(
        'profile/business-profile',
        {
            page: 'business-profile'
        }
    )
};


module.exports.GetBusinessClientProfile = async (req, res, next) => {

    res.render(
        'profile/business-client-profile',
        {
            page: 'business-client-profile'
        }
    )
};


module.exports.GetBusinessFreelancerProfile = async (req, res, next) => {
    

    res.render(
        'profile/business-freelancer-profile',
        {
            page: 'business-freelancer-profile'
        }
    )
};



module.exports.UpdateBusinessFreelancerProfile = async (req, res, next ) => {

    let user_account = await UserAccount.findOne({where:{id:res.locals.user.id} });
    req.session.UserAccount = user_account;



    //use multer to upload file to public/images folder
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/',
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
                businessname: req.body.businessname,
                service: req.body.service,
                availability: req.body.availability,
                golden_paragraph: req.body.golden_paragraph,
                country: req.body.country,
                city: req.body.city,
                email: req.body.email,
                phone: req.body.phone,
                picture: filenameGlobal
            };

            console.log(userDetails)
            if(filenameGlobal===""){
                delete userDetails.picture
            }
            BusinessUser.update(userDetails, { where: {UserId:req.body.id} }).then(response =>{
                req.session.profileChangeMessage = response != null;
                UserAccount.findOne({ where:{id:res.locals.user.id}}).then(rows=>{
                     req.session.user = rows;
                     console.log(response);
                     console.log('updated')
                     if(rows.firstTime){
                        res.redirect('/user/complete-business-freelancer-portfolio')
                     }else{

                     }

                 });
            });
        }
    });


}


module.exports.UpdateBusinessClientProfile = async (req, res, next ) => {
    
}


hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};