module.exports.GetBusinessCompleteSkills = async (req, res, next) => {

    res.render(
        'skills/business/complete-business-skills',
        {
            page: 'complete-business-skills'
        }
    )
};




module.exports.GetBusinessSkills = async (req, res, next) => {

    res.render(
        'skills/business/business-skills',
        {
            page: 'business-skills'
        }
    )
};