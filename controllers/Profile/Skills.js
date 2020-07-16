module.exports.GetCompleteSkills = async (req, res, next) => {
    res.render(
        'skills/complete-skills',
        {
            page: 'skills/complete-skills'
        }
    )
};