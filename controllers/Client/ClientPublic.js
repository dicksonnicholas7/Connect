module.exports.GetPublicClients = (req, res, next ) => {
    res.render(
        'find-clients',
        {
            page:'clients'
    })
}