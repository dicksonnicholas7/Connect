'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobApplication = sequelize.define('JobApplication', {
    application_status: DataTypes.STRING,
    application_message: DataTypes.STRING
  }, {});
  JobApplication.associate = function(models) {
    // associations can be defined here
    JobApplication.belongsTo(models.UserAccount, {
      foreignKey: 'FreelanceId',
      onDelete: 'CASCADE'
    });

    JobApplication.belongsTo(models.Job,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });
  };  
  return JobApplication;
};