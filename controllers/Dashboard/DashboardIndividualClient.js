module.exports.GetDashboardIndividualClient = (req, res, next) => {
    res.render(
        'dashboard/dashboard-individual-client',
        {
            page:'dashboard-individual-client'
        }
    )
}