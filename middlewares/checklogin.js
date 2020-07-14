const { GetProfile, UpdateProfile, GetProfileSuccess, CompleteProfile } = require('../controllers/Profile/Profile');

module.exports.checkLoggedIn = function(req, res, next) {
    if(req.session.loggedIn){
        if(req.session.user.UserAccount.verified===true){
            console.log(req.originalUrl);
            if(req.session.user.firstname!=null || req.originalUrl=='/user/profile' || req.originalUrl=='/user/update-profile'){
                next();
            }else{
                CompleteProfile(req, res, next);
            }            
        }else{
            if(req.session.user.UserAccount.RoleId===3){
                next();
            }else{
                let usertype = 0
                let show = false;
            
                if(!res.locals.user){
                    show = false;
                }else{
                    show = true;
                     usertype = res.locals.user.UserAccount.RoleId;
                }
                res.render("auth/success-register",
                {
                    usertype,
                    show,
                    page:'signup'
                }
                );
            }
        }       
    } else{
        res.redirect("/login");
    }
     
};