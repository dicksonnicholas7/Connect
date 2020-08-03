const nodeMailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const {client_id, client_secret, refresh_token} = require('../../config/keys');
var fs = require("fs");
var ejs = require("ejs");
let secret = "connect";

//set up google OAuth2 client
const oauth2Client = new OAuth2(
    client_id, // ClientID
    client_secret, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

//set credentials to get access token
oauth2Client.setCredentials({
    refresh_token: refresh_token
});
const accessToken = oauth2Client.getAccessToken();

//send email for verification
module.exports.SendMailVerify = async (emailReceiver, token, hostname)=>{


    let emailHash = hashPassword(emailReceiver);


    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "nicholas.dickson@amalitech.com",
            clientId: client_id,
            clientSecret: client_secret,
            refreshToken: refresh_token,
            accessToken: accessToken
        }
    });

    ejs.renderFile('C:\\Users\\AMALITECH-PC\\Documents\\amalitech projects\\Connect\\views\\email-verify.ejs', { hostname: hostname , emailReceiver:emailHash, token:token}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var mainOptions = {
                to: emailReceiver,
                from: 'Connect',
                subject: 'Connect - Verify your email',
                html: data
            };
            //console.log("html data ======================>", mainOptions.html);
    
            transporter.sendMail(mainOptions, function (err, info) {
              if (err) {
                console.log("Email sent successfully");
                return 1;
              } else {
                console.log("email not sent "+err.message);
                return (err.message);
              }
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
