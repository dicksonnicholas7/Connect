module.exports.GetSignUpPage = (req, res, next ) => {

        res.render(
                'signup-page',
                {
                    page:'signup-page'
                }
            )
};
