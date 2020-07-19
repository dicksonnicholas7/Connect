module.exports.GetDashboardIndividualFreelancer = (req, res, next) => {
    res.render(
        'dashboard/dashboard-individual-freelancer',
        {
            page:'dashboard-individual-freelancer'
        }
    )
}