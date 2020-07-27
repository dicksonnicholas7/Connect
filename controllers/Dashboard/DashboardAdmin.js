const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const JobPayment = require('../../models').JobPayment;
const Chat = require('../../models').Chat;
const Contract = require('../../models').Contract;
const JobReport = require('../../models').JobReport;
const db = require("../../models");
const { QueryTypes } = require('sequelize');

module.exports.GetDashboardAdmin = async (req, res, next) =>{


    res.render(
        'dashboard/dashboard-admin',
        {
        page: 'dashboard-admin'
        }
    )

};