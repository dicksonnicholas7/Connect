module.exports.GetBusinessCompleteProfile = async (req, res, next) => {

    res.render(
        'profile/business/complete-business-profile',
        {
            page: 'complete-business-profile'
        }
    )
};




module.exports.GetBusinessProfile = async (req, res, next) => {

    res.render(
        'profile/business/business-profile',
        {
            page: 'business-profile'
        }
    )
};
