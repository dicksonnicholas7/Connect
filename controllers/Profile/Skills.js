module.exports.GetCompleteSkills = async (req, res, next) => {
    res.render(
        'skills/complete-individual-skills',
        {
            page: 'complete-individual-skills'
        }
    )
};