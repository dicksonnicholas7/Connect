const { GetCompleteFreelancerProfile, GetCompleteClientProfile } = require('../Profile/Profile')
const { GetBusinessClientCompleteProfile, GetBusinessFreelancerCompleteProfile } = require('../Profile/BusinessProfile')


module.exports.GetDashboardSwitch = async (req, res, next) =>{


    if(res.locals.user.firstTime){

        if(res.locals.user.UserTypeId === 1){
            //business
            if(res.locals.user.RoleId === 1){
                //client

                GetBusinessClientCompleteProfile(req, res, next);

            }else if(res.locals.user.RoleId === 2){
                //freelancer

                GetBusinessFreelancerCompleteProfile(req, res, next);
            }
        }else if(res.locals.user.UserTypeId === 2){
            //individual
            if(res.locals.user.RoleId === 1){
                //client

                GetCompleteClientProfile(req, res, next);
            }else if(res.locals.user.RoleId === 2){
                //freelancer

                GetCompleteFreelancerProfile(req, res, next);


            }
        }else{

            console.log('no usertype found')

        }

    }else{
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
    }

};