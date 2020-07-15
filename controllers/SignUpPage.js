module.exports.GetSignUpPage = (req, res, next ) => {
    let usertype = 0
    let show = false;

    if(!res.locals.user){
        show = false;
    }else{
        show = true;
         usertype = res.locals.user.UserAccount.RoleId;
    }
    
        res.render(
                'signup-page',
                {
                    usertype,
                    show,
                    page:'signup-page'
                }
            )
};
