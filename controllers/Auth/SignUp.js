const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const BusinessUser = require('../../models').BusinessUser;
const Portfolio = require('../../models').Portfolio;
const Education = require('../../models').Education;
const Qualification = require('../../models').Qualification;
const crypto = require('crypto');
let secret = "group3";
const jwt = require('jsonwebtoken');
const {SendMailVerify} = require('./VerificationEmail');
const validator = require("email-validator");



module.exports.GetBusinessSignUp = (req, res, next ) => {
    let usertype = 0
    let show = false;

    if(!res.locals.user){
        show = false;
    }else{
        show = true;
         usertype = res.locals.user.UserAccount.RoleId;
    }
    

    console.log(usertype);

    //render sign up page

    if(req.session.loggedIn===true){
        res.redirect('/');
    }else{ 
        res.render(
                'auth/business-signup',
                {
                    usertype,
                    show,
                    page:'business-signup',
                    signUpErrorMessage:'',
                    signUpSuccessMessage:''
                }
            )
    }
};


module.exports.GetSignUp = (req, res, next ) => {
    let usertype = 0
    let show = false;

    if(!res.locals.user){
        show = false;
    }else{
        show = true;
         usertype = res.locals.user.UserAccount.RoleId;
    }
    

    console.log(usertype);

    //render sign up page

    if(req.session.loggedIn===true){
        res.redirect('/');
    }else{ 
        res.render(
                'auth/signup',
                {
                    usertype,
                    show,
                    page:'signup',
                    signUpErrorMessage:'',
                    signUpSuccessMessage:''
                }
            )
    }
};

//perform signup operation. Also set up a portfolio for freelancers with empty data
module.exports.DoSignUp = async (req, res, next) => {
    let usertype = 0
    let show = false;

    if(!res.locals.user){
        show = false;
    }else{
        show = true;
         usertype = res.locals.user.UserAccount.RoleId;
    }
    
    //generate a token for email verification
    if(validator.validate(req.body.email)){
        
    const token = jwt.sign(
        { userId: req.body.email },
        'connect',
        { expiresIn: '24h' });

        let user_type = 0;

        if(req.originalUrl=='/signup'){
            user_type = 2;
        }else if(req.originalUrl=='/business-signup'){
            user_type = 1;
        }

        console.log(user_type);
        console.log(req.originalUrl)

    let userInfo = {
        email: req.body.email || '',
        mobile: req.body.mobile || '',
        UserAccount: [
            {
                username: '',
                password: hashPassword(req.body.password),
                RoleId: req.body.role,
                UserTypeId: user_type,
                verified: false,
                token: token,
            }
        ]
    };

    if(user_type === 2){
            //check if email is already used
    let user = await User.findOne({ where:{email:req.body.email} });
    if(user!==null && user.email===req.body.email){
        console.log("User already exists. Log in");
        let error = 'User by that email already exists';
        let success = '';
        getSignUpPage(req, res, next, error, success );
    }else{
        let user_Account = await User.create(userInfo, { include: [UserAccount] } );
        if(user_Account.id!==null){

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
                    usertype,
                    show,
                    page:'signup',
                    signUpSuccessMessage:'An email has been sent to your account to verify.'
                });

        }else{
            console.log("Error creating account ");
            let error = 'Error creating account';
            let success = '';
            getSignUpPage(req, res, next, error, success );
        }
    }
    }else if (user_type === 1){
            //check if email is already used
    let user = await BusinessUser.findOne({ where:{email:req.body.email} });
    if(user!==null && user.email===req.body.email){
        console.log("Business User already exists. Log in");
        res.render(
            'auth/business-sign-up',
            {
                page:'business-signup',
                signUpErrorMessage: 'User by that email already exists'
            }
        );
    }else{
        let bus_Account = await BusinessUser.create(userInfo, { include: [UserAccount] } );
        if(bus_Account.id!==null){
            //set up portfolio for user
            let bus_Portfolio = await Portfolio.create({BusinessPortId:bus_Account.id});
            if(bus_Portfolio.id!==null) {
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
            }else{
                console.log("Profile could not be created");
                req.session.signUpErrorMessage = "Error creating account";
                res.render(
                    'auth/business-sign-up',
                    {
                        page:'business-signup',
                        signUpErrorMessage: 'Error creating Business Account'
                    }
                );
            }
        }else{
            console.log("Error creating account ");
            res.render(
                'auth/business-sign-up',
                {
                    page:'business-signup',
                    signUpErrorMessage: 'Error creating Business Account'
                }
            );
        }
    }
    }
    }else{
        let error = 'Please enter a valid email address';
        let success = '';
        getSignUpPage(req, res, next, error, success );

    }
};



getSignUpPage = (req, res, next, signUpErrorMessage, signUpSuccessMessage ) => {
    let usertype = 0
    let show = false;

    if(!res.locals.user){
        show = false;
    }else{
        show = true;
         usertype = res.locals.user.UserAccount.RoleId;
    }
    

    console.log(usertype);

    //render sign up page

    if(req.session.loggedIn===true){
        res.redirect('/');
    }else{ 
        res.render(
                'auth/signup',
                {
                    usertype,
                    show,
                    page:'signup',
                    signUpErrorMessage: signUpErrorMessage,
                    signUpSuccessMessage:signUpSuccessMessage
                }
            )
    }
}


//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};
