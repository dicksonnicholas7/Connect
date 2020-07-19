module.exports.GetDashboardBusinessClient = (req, res, next) => {
    res.render(
        'dashboard/dashboard-business-client',
        {
            page:'dashboard-business-client'
        }
    )
}