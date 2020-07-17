module.exports.GetBusinessClientCompleteProfile = async (req, res, next) => {

    res.render(
        'profile/complete-business-client-profile',
        {
            page: 'complete-business-client-profile'
        }
    )
};

module.exports.GetBusinessFreelancerCompleteProfile = async (req, res, next) => {

    res.render(
        'profile/complete-business-freelancer-profile',
        {
            page: 'complete-business-freelancer-profile'
        }
    )
};




module.exports.GetBusinessFreelancerProfile = async (req, res, next) => {

    res.render(
        'profile/business-profile',
        {
            page: 'business-profile'
        }
    )
};


module.exports.GetBusinessClientProfile = async (req, res, next) => {

    res.render(
        'profile/business-client-profile',
        {
            page: 'business-client-profile'
        }
    )
};


module.exports.GetBusinessFreelancerProfile = async (req, res, next) => {

    res.render(
        'profile/business-freelancer-profile',
        {
            page: 'business-freelancer-profile'
        }
    )
};
