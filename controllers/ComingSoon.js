module.exports.GetComingSoonUpPage = (req, res, next ) => {
    let usertype = 0
    let show = false;

    if(!res.locals.user){
        show = false;
    }else{
        show = true;
         usertype = res.locals.user.UserAccount.RoleId;
    }
    
        res.render(
                'coming-soon',
                {
                    usertype,
                    show,
                    page:'coming-soon'
                }
            )
};
