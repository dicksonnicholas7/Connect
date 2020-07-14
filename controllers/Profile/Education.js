const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Education = require('../../models').Education;
const Certificate = require('../../models').Certificate;
const crypto = require('crypto');
let secret = "group3";
const path = require('path');
const multer = require('multer');
const axios = require('axios');


//get all education
module.exports.GetAllEducations = async (req, res, next) => {
    let user_education = await Education.findAll({where:{UserId:res.locals.user.id} });
    req.session.user.Education  = user_education;
    res.render(
        'profile/educations'
    )
}


module.exports.GetEducation = async (req, res, next) => {
    let education_id = req.params.id;
    let user_education = await Education.findOne({where:{id:education_id} });
    let country = [
        {name: 'Ghana'},
        {name: 'Germany'},
    ];
    res.render(
        'profile/education',
        {
            user_education,
            country
        }
    )
 
    
};

//render education page
module.exports.GetAddEducation = async (req, res, next) => {
    let country = [
        {name: 'Ghana'},
        {name: 'Germany'},
    ];
    res.render(
        'profile/add-education',
        {
            country
        }
    )   
};

module.exports.AddEducation = async (req, res, next) =>{
    let ft = false;
    Education.findAll({ where:{id:res.locals.user.id}}).then(row=>{
        if(row.length===0){
            ft = true;
        }else{
            ft = false;
        }
    }).catch(e=>{
        console.log(e);
    })


    let country = {};
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country = response.data;        
        }).catch(error => {
            //api fails, add some countries
            console.log(error);
            country = [
                {name: 'Ghana'},
                {name: 'Germany'},
            ];
        });



        let userEducation = {
            UserId: res.locals.user.id,
            country: req.body.edu_country,
            city: req.body.edu_city,
            institution_name: req.body.edu_name,
            qualification: req.body.edu_qualification
        };


        if(!req.body.cert){

            console.log('no certificate entry')

        }else{

            let userCertificate = {
                UserId: res.locals.user.id,
                cert_name: req.body.cert
            }

            Certificate.create(userCertificate);
        }
        
        Education.create(userEducation).then(rows=>{
            if(ft==true){
                res.redirect('/user/payment');
            }else{
                res.redirect('/user/educations');
            }
        }).catch(e=>{
            console.log(e);
        });
};

//update user education
module.exports.UpdateEducation = async (req, res, next) => {
    let country = [
        {name: 'Ghana'},
        {name: 'Germany'},
    ];
    let userEducation = {
        country: req.body.edu_country,
        city: req.body.edu_city,
        institution_name: req.body.edu_name,
        qualification: req.body.edu_qualification
    };

    if(!req.body.cert){

        console.log('no certificate entry')

    }else{

        let userCertificate = {
            cert_name: req.body.cert
        }

        Certificate.update(userCertificate, {where:{UserId:res.locals.user.id}});
    }

    Education.update(userEducation, { where: {id:req.body.id} }).then(response =>{
        req.session.educationChangeMessage = response != null;
        Education.findAll({
            where:{userId:res.locals.user.id}
        }).then(rows=>{
            req.session.user.Education = rows;
            console.log(response);
        }).catch(e=>{
            console.log(e);
        });
    });
    res.redirect('/user/educations');
   // res.redirect('/user/payment');

};


module.exports.DeleteEducation = async (req, res, next) => {
    let educationId = req.body.id;
    let education_deleted = await Education.destroy({where:{id:educationId}});
    if(education_deleted !== null) {
      res.send("success");
    }else{
      res.send("error");
    }
};



//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};