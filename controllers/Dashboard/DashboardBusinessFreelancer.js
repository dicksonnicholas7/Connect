module.exports.GetDashboardBusinessFreelancer = (req, res, next) => {
    res.render(
        'dashboard/dashboard-business-freelancer',
        {
            page:'dashboard-business-freelancer'
        }
    )
}