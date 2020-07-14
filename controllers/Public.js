const { Op } = require("sequelize");
const Job = require('../models').Job;

module.exports.GetHowItWorks = async (req, res, next) => {
    let usertype = 0
    let show = false;

    if(!res.locals.user){
        show = false;
    }else{
        show = true;
         usertype = res.locals.user.UserAccount.RoleId;
    }
    

    console.log(usertype);
    res.render(
        'how-it-works',
        {
            usertype,
            show,
            page: 'how-it-works'
        }
    )
};