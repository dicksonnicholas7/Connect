module.exports.checkLoggedIn = function(req, res, next) {
    if(req.session.loggedIn){
        if(req.session.user.verified===true){
            next();
        }else{
            if(req.session.user.RoleId===3){
                next();
            }else{
                res.render("auth/success-register",{page:'signup'});
            }
        }       
    } else{
        res.redirect("/login");
    }
     
};
