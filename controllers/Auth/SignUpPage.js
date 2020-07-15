module.exports.GetSignUpPage = (req, res, next ) => {
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
                'auth/signup-page',
                {
                    usertype,
                    show,
                    page:'signup-page'
                }
            )
    }
};
