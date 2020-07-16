const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const BusinessUser = require('../../models').BusinessUser;
const crypto = require('crypto');
let secret = "group3";
const jwt = require('jsonwebtoken');
const {SendMailVerify} = require('./VerificationEmail');
const validator = require("email-validator");


module.exports.GetSignUp = (req, res, next ) => {

   let  signUpTypeBusiness = ''
    let signUpTypeIndividual = ''
 

    if(req.params.type === 'individual'){

        signUpTypeBusiness = ''
        signUpTypeIndividual = 'Individual Account'
    }else{
        signUpTypeBusiness = 'Business Account'
        signUpTypeIndividual = ''
    }

    //render sign up page

    if(req.session.loggedIn===true){
        res.redirect('/');
    }else{ 
        res.render(
                'auth/signup',
                {
                    signUpTypeBusiness,
                    signUpTypeIndividual,
                    page:'signup',
                    signUpErrorMessage:'',
                    signUpSuccessMessage:''
                }
            )
    }
};






/**
 * sign up for individual
 * **/


module.exports.DoSignUp = async (req, res, next) => {
 //generate a token for email verification

   if(req.body.password !== req.body.conpassword ){
       if(req.params.type === 'business'){
        res.render(
            'auth/signup',
            {
                signUpTypeBusiness:'Business',
                signUpTypeIndividual:'',
                page:'signup',
                signUpErrorMessage:'Password do not match',
                signUpSuccessMessage:''
            }
        )

       }else{
        res.render(
            'auth/signup',
            {
                signUpTypeBusiness:'',
                signUpTypeIndividual:'Individual',
                page:'signup',
                signUpErrorMessage:'Password do not match',
                signUpSuccessMessage:''
            }
        )
       }

   }else{
    if(validator.validate(req.body.email)){
        
        const token = jwt.sign(
            { userId: req.body.email },
            'connect',
            { expiresIn: '24h' });
    
            
            console.log(req.originalUrl)
            console.log(req.params.type)
    
            if(req.params.type ==='individual'){
    
                let user_type = 2;
    
                console.log(user_type);
    
    
                let userInfo = {
                    email: req.body.email,
                    password: hashPassword(req.body.password),
                    RoleId: req.body.role,
                    UserTypeId: user_type,
                    verified: false,
                    blocked: false,
                    token: token,
                }
    
            //check if email is already used
        let user = await UserAccount.findOne({ where:{email:req.body.email} });
    
        if(user!==null && user.email===req.body.email){
    
            console.log("User already exists. Log in");
    
            res.render(
                'auth/signup',
                {
                    signUpTypeBusiness:'',
                    signUpTypeIndividual:'Individual',
                    page:'signup',
                    signUpErrorMessage:'User by that email already exists',
                    signUpSuccessMessage:''
                }
            )
    
        }else{
            let user_Account = await UserAccount.create(userInfo);
            if(user_Account.id!==null){
    
                let individual_info = {
                    UserId: user_Account.id,
                    username: '',
                    firstname:'',
                    lastname:'',
                    gender:'',
                    dob:'',
                    specialization:'',
                    about:'',
                    mobile:''
                };
                let individual_user_details = User.create(individual_info);
    
                if(individual_user_details.id !== null){
                    console.log("Account Created successfully");
    
                    let hostname = req.headers.host;
                    try{
                        req.session.uemail = userInfo.email;
                        req.session.utoken = token;
                    }catch(e){
                        console.log(e);
                    }
                    //send verification email
                    SendMailVerify(userInfo.email, token, hostname);
        
                    res.render(
                        
                        "auth/success-register",
                        
                        {
                            page:'signup',
                            signUpSuccessMessage:'An email has been sent to your account to verify.'
                        });
                }else{
                    console.log("Error creating account ");
                    res.render(
                        'auth/signup',
                        {
                            signUpTypeBusiness: 'business',
                            signUpTypeIndividual: '',
                            page:'signup',
                            signUpErrorMessage:'Error creating account ',
                            signUpSuccessMessage:''
                        }
                    )
                }
            }
        }
    
    
            }else if(req.params.type==='business'){
    
                let user_type = 1;
    
                console.log(user_type);
    
      
        let userInfo = {
            email: req.body.email,
            password: hashPassword(req.body.password),
            RoleId: req.body.role,
            UserTypeId: user_type,
            verified: false,
            blocked: false,
            token: token,
        }
    
    
    
                //check if email is already used
     let user = await UserAccount.findOne({ where:{email:req.body.email} });
    
        if(user!==null && user.email===req.body.email){
            console.log("Business User already exists. Log in");
            res.render(
                'auth/signup',
                {
                    signUpTypeBusiness:'Business',
                    signUpTypeIndividual:'',
                    page:'signup',
                    signUpErrorMessage:'Business User already exists. Log in',
                    signUpSuccessMessage:''
                }
            )
        }else{
    
            let user_Account = await UserAccount.create(userInfo);
    
            if(user_Account.id!==null){
    
                let business_user_info = {
                    BusinessUserId: user_Account.id,
                    name: '',
                    location: '',
                    certificate: ''
                }
    
                let business_user_details = BusinessUser.create(business_user_info);
    
                if(business_user_details.id !== null){
                    console.log("Business Account Created successfully");
                    let hostname = req.headers.host;
                    try{
                        req.session.uemail = userInfo.email;
                        req.session.utoken = token;
                    }catch(e){
                        console.log(e);
                    }
    
                                //send verification email
                SendMailVerify(userInfo.email, token, hostname);
                res.render("auth/success-register",{page:'business-signup',signUpSuccessMessage:'An email has been sent to your account to verify.'});
    
                }
               
            }else{
                console.log("Error creating account ");
                res.render(
                    'auth/signup',
                    {
                        signUpTypeBusiness:'Business',
                        signUpTypeIndividual:'',
                        page:'signup',
                        signUpErrorMessage:'Error creating account n',
                        signUpSuccessMessage:''
                    }
                )
            }
        }
    
    
                
            }
    
        }else{
            let error = 'Please enter a valid email address';
            let success = '';
            res.redirect(req.originalUrl);
    
        }


   }

};



//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};
