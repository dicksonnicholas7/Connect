const { GetBusinessClientCompleteProfile, GetBusinessFreelancerCompleteProfile } = require ('../controllers/Profile/Business-Profile/Profile');


module.exports.checkLoggedIn = function(req, res, next) {
    if(req.session.loggedIn){
        if(req.session.user.verified===true){
            console.log(req.originalUrl);
            if(!req.session.user.firstTime){
                console.log('not first time user');
                next();
            }else{
                console.log('first time user');
                if(req.session.user.UserTypeId === 1){
                    console.log('business user');
                    if(req.session.user.RoleId === 1 ){
                        console.log('business client');
                        //render the business client complete profile page

                        GetBusinessClientCompleteProfile(req, res, next);


                    }else if( req.session.user.RoleId === 2 ){
                        console.log('business freelancer');
                        //render the business freelancer complete profile page

                        GetBusinessFreelancerCompleteProfile(req, res, next);
                    }

                }else if(req.session.user.UserTypeId === 2){
                    console.log('individual user');

                    if(req.session.user.RoleId === 1 ){
                        console.log('individual client');
                        //render the individual client complete profile page


                    }else if( req.session.user.RoleId === 2 ){
                        console.log('individual freelancer');
                        //render the individual freelancer complete profile page

                        
                    }
                }
            }            
        }else{
            if(req.session.user.RoleId===3){
                next();
            }else{

                console.log('verify your account')

                res.render("auth/success-register",
                {
                    page:'signup'
                }
                );
            }
        }       
    } else{
        res.redirect("/login");
    }
     
};