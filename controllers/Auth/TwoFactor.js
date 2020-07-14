require('dotenv').config();
const TwoFactorAuth = require('../../models').TwoFactorAuth;
const {NotifyMail} = require('../../services/Notification');
const auth = require('codeauth');
const Client = require('authy-client').Client;
const authy = new Client({key: process.env.AUTHY_API_KEY});



module.exports.TwoFactor = (req, res, next ) => {

    let username = res.locals.user.UserAccount.username;
    let receiverEmail = res.locals.user.email;

    console.log(username);
    console.log(receiverEmail);

    let userCode = new auth.code( "Test User", 6 ); 
    userCode.store();
    

    if(req.params.medium === 'sms'){
        const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_KEY);

        client.messages
                    .create({
                             body: userCode.code,
                             from: '+12057083782',
                             to: '+233546243450'
                             })
                .then(message => console.log(message.sid));
    }else if(req.params.medium === 'email'){

        let notifyMailParts = {
            title: "Two Factor Authentication",
            message: '<div style="background-color:white;color:black;">'+
                     '<p style="font-weight: bold;">Amalitech-Freelancer</p>'+ 
                     '<p> Enter '+userCode.code+ ' to continue...</p>',
            ReceiverEmail: receiverEmail
        };
        NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);
    }
}


module.exports.CreateAuthyUser = async (req, res, next) => {

    let respo = await authy.registerUser({
        countryCode: 'GH',
        email: 'noxwillis@gmail.com',
        phone: '546243450'
    });

    console.log(respo.user.id)

    if(respo !== null ){
        let authUser = {
            AuthyId: respo.user.id,
            mobile:'546243450',
            UserId:res.locals.user.id,
        }

     let checkUser = await TwoFactorAuth.findOne({where:{UserId:res.locals.user.id}});
        if(checkUser !== null){
            console.log("user exists")
        }else{
            user_details = TwoFactorAuth.create(authUser);
            if(user_details!== null){
                console.log(user_details)
            }else{
                console.log('error creating record')
            }
        }
     
    }else{
        console.log('error')
}

res.redirect('/')

}


module.exports.SendUserCode =  async (req, res, next) => {

    let user = await TwoFactorAuth.findOne({where:{UserId:res.locals.user.id}});

    if(user !== null ){
        let authyId = user.AuthyId;

        let reqSMSRes = await authy.requestSms({authyId: authyId }, {force: true});

        if(!reqSMSRes){
            console.log('error')
        }else{
            console.log(reqSMSRes)
            res.redirect('/')
        }
    }else{
        console.log('user not registered for code')
    }

    
}



module.exports.CallUserForCode =  async (req, res, next) => {

    let user = await TwoFactorAuth.findOne({where:{UserId:res.locals.user.id}});

    if(user !== null ){
        let authyId = user.AuthyId;

        let reqCallRes = await authy.requestCall({authyId: authyId }, {force: true});

        if(!reqSMSRes){
            console.log('error')
        }else{
            console.log(reqCallRes)
            res.redirect('/')
        }

    }else{
        console.log('user not registered for two factor')

    }


}


module.exports.VerifyAuthToken = async  (req, res, next) => {
    let userId = res.locals.user.id;

    let user_details = await TwoFactorAuth.findOne({where:{UserId: userId}});

    if(user_details !== null){
        console.log("Verify Token");

          
        authy.verifyToken({authyId: user_details.AuthyId, token: req.params.token}, function (err, tokenRes) {
            if (err) {
                console.log("Verify Token Error: ", err);
            }
            console.log("Verify Token Response: ", tokenRes);
            if (tokenRes.success) {
              console.log('user verified')
            }
        });
       
    }else{
        console.log('user not found')
    }
}
