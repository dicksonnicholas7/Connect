const UserAccount = require('../../models').UserAccount;
const Portfolio = require('../../models').Portfolio;
const crypto = require('crypto');
let secret = "connect";
const path = require('path');
const multer = require('multer');



module.exports.GetBusinessCompletePortfolio = async (req, res, next) => {

    res.render(
        'portfolio/complete-business-portfolio',
        {
            page: 'complete-business-portfolio'
        }
    )
};




module.exports.GetBusinessPortfolio = async (req, res, next) => {

    res.render(
        'portfolio/business-portfolio',
        {
            page: 'business-portfolio'
        }
    )
};   


module.exports.AddBusinessPortfolio = async (req, res, next ) => {


    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/portfolio',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });

    const upload = multer({
        storage:storage
    }).single('picture');

    upload(req,res,(err)=>{
        if(err){
            console.log(err.toString());
            res.redirect('/user/');
        }else{
            console.log("uploaded");
            let userPortfolio = {
                UserId: req.body.id,
                title: req.body.title,
                description: req.body.description,
                projectLinks: req.body.projectLinks,
                picture: filenameGlobal
            };
            if(filenameGlobal===""){
                delete userPortfolio.picture
            }
            Portfolio.create(userPortfolio).then(response =>{
                console.log('portfolio created')
            });

        }
    });
}


hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};