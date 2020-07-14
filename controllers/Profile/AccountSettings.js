const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');



module.exports.GetAccountSettings = async (req, res, next) => {
    res.render(
        'profile/account-settings',
        {
            page: 'account-settings'
        }
    )
};


// module.exports.GetAllAccountSettings = async (req, res, next) => {
//     let user_account_settings = await AccountSettings.findAll({where:{UserId:res.locals.user.id} });
//     req.session.user.AccountSettings  = user_account_settings;
//     res.render(
//         'profile/account-settings'
//     )
// }



// module.exports.GetAccountSettings = async (req, res, next) => {
//     let account_id = req.params.id;
//     let user_account_setting = await AccountSettings.findOne({where:{id:account_id} });
//     res.render(
//         'profile/account-setting',
//         {
//             user_account_setting
//         }
//     )
 
    
// };


// //render account settings page
// module.exports.GetAddAccountSettings = async (req, res, next) => {
//     let settings = [
//         {name: 'settings 1'},
//         {name: 'settings 2'},
//     ];
//     res.render(
//         'profile/add-account-settings',
//         {
//             settings
//         }
//     )   
// };
