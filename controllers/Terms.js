//render terms and conditions  page
module.exports.GetTermsAndConditions = async (req, res, next) => {
    res.render(
        'terms-and-conditions',
        {
            page: 'terms-and-conditions'
        }
    )
};