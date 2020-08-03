

module.exports.GetUsers = async (req, res, next) => {
res.render('admin/users')
};


module.exports.GetFreelancers = async (req, res, next) => {
    res.render('admin/freelancers')
}


module.exports.GetClients = async (req, res, next) => {
    res.render('admin/clients')
}
