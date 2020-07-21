
module.exports.GetDashboardSwitch = async (req, res, next) =>{
    if(res.locals.user.RoleId===1){
        res.redirect('/user/dashboard-client');
    }

    if(res.locals.user.RoleId===2){
        res.redirect('/user/dashboard-freelancer');
    }

    if(res.locals.user.RoleId===3){
        res.redirect('/admin/dashboard-admin');
    }else{

    }
};