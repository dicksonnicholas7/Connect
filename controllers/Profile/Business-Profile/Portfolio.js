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