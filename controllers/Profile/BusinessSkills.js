module.exports.GetBusinessCompleteSkills = async (req, res, next) => {

    res.render(
        'skills/complete-business-skills',
        {
            page: 'complete-business-skills'
        }
    )
};




module.exports.GetBusinessSkills = async (req, res, next) => {

    res.render(
        'skills/business-skills',
        {
            page: 'business-skills'
        }
    )
};