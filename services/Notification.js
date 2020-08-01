const Notification = require('../models').Notification;
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodeMailer = require('nodemailer');
const {client_id, client_secret, refresh_token} = require('../config/keys');


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



module.exports.Notify = (title, message, ReceiverId) =>{
    let notifyDetails = {
        title,
        message,
        ReceiverId
    };
    let notify = Notification.create(notifyDetails);
    console.log(notify);
};

module.exports.NotifyMail = (title, message, ReceiverEmail) =>{
    SendMail(title, message, ReceiverEmail);
}; 

const SendMail = (subject,message,emailReceiver)=>{


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


    const mailOptions = {
        to: emailReceiver,
        from: 'Connect',
        subject: subject,
        html: message
    };




    transporter.sendMail(mailOptions)
        .then(() => {
            console.log("Email sent successfully");
            return 1;
        }).catch((err) => {
        console.log(err.message);
        return (err.message);
    });

};