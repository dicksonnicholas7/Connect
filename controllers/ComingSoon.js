const TimeLapsed = require('timelapsed');
 


module.exports.GetComingSoonUpPage = (req, res, next ) => {


 
   console.log(TimeLapsed.fromDateString('2020-07-24 14:48:46'));

    let usertype = 0
    let show = false;

    if(!res.locals.user){
        show = false;
    }else{
        show = true;
         usertype = res.locals.user.RoleId;
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
