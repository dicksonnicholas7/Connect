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
            //client
            if(res.locals.user.UserTypeId === 1){
                //business client dashboard
                res.redirect('/user/dashboard-business-client');
            }else{
               //individual client dashboard
                res.redirect('/user/dashboard-individual-client');
            }
        }
    
        if(res.locals.user.RoleId===2){
                        //freelancer
                        if(res.locals.user.UserTypeId === 1){
                            //individual freelancer dashboard
                            res.redirect('/user/dashboard-business-freelancer');
                        }else{
                           //individual freelancer dashboard
                            res.redirect('/user/dashboard-individual-freelancer');
                        }
        }
    
        if(res.locals.user.RoleId===3){
            res.redirect('/admin/dashboard-admin');
        }else{
    
        }
    }

};