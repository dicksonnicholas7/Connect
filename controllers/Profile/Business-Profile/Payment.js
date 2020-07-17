module.exports.GetBusinessCompletePayment = async (req, res, next) => {

    res.render(
        'payment/business/complete-business-payment',
        {
            page: 'complete-business-payment'
        }
    )
};




module.exports.GetBusinessPayment = async (req, res, next) => {

    res.render(
        'payment/business/business-payment',
        {
            page: 'business-payment'
        }
    )
};