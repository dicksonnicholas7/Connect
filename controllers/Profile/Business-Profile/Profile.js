module.exports.GetBusinessCompleteProfile = async (req, res, next) => {

    res.render(
        'profile/complete-business-profile',
        {
            page: 'complete-business-profile'
        }
    )
};




module.exports.GetBusinessProfile = async (req, res, next) => {

    res.render(
        'profile/business-profile',
        {
            page: 'business-profile'
        }
    )
};
