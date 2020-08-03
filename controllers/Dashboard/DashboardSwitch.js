const User = require('../../models').User;
const Portfolio = require('../../models').Portfolio;
const { GetCompleteFreelancerProfile, GetCompleteClientProfile, GetCompleteFreelancerSkills , GetCompleteFreelancerPortfolio} = require('../Profile/Profile')
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

                let check_complete_profile = await User.findOne({where:{UserId:res.locals.user.id}});

                if(check_complete_profile.firstname !== ''){

                    let check_complete_portfolio = await Portfolio.findOne({where:{UserId:res.locals.user.id}});

                    if(check_complete_portfolio !== null){

                        GetCompleteFreelancerSkills(req, res, next);

                    }else{
                        GetCompleteFreelancerPortfolio(req, res, next);
                    }
                }else{
                    GetCompleteFreelancerProfile(req, res, next);
                }

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
            res.redirect('/user/dashboard-admin');
        }else{
    
        }
    }

};