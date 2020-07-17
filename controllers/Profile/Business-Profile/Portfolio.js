module.exports.GetBusinessCompletePortfolio = async (req, res, next) => {

    res.render(
        'portfolio/business/complete-business-portfolio',
        {
            page: 'complete-business-portfolio'
        }
    )
};




module.exports.GetBusinessPortfolio = async (req, res, next) => {

    res.render(
        'portfolio/business/business-portfolio',
        {
            page: 'business-portfolio'
        }
    )
};