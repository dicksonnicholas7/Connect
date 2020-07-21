'use strict';
module.exports = (sequelize, DataTypes) => {
  const SelectedJobs = sequelize.define('SelectedJobs', {
  }, {});

  SelectedJobs.associate = function(models) {
    // associations can be defined here
    SelectedJobs.belongsTo(models.UserAccount,{
      foreignKey: 'ClientId',
      onDelete: 'CASCADE'
    });

    SelectedJobs.belongsTo(models.UserAccount,{
      foreignKey: 'FreelancerId',
      onDelete: 'CASCADE'
    });

    SelectedJobs.belongsTo(models.Job,{
      foreignKey: 'JobId',
      onDelete: 'CASCADE'
    });
  };
  return SelectedJobs;
};