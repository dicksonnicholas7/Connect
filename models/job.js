'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    job_title: DataTypes.STRING,
    job_details: DataTypes.STRING,
    job_timeLength: DataTypes.STRING,
    job_price: DataTypes.DECIMAL(6, 2),
    job_skills: DataTypes.STRING,
    job_status: DataTypes.STRING,
    job_jobType: DataTypes.INTEGER,
    job_UserType:DataTypes.STRING
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
    Job.belongsTo(models.UserAccount,{
      foreignKey: 'ClientId',
      onDelete: 'CASCADE'
    });

    Job.belongsTo(models.JobCategory,{
      foreignKey: 'CatId',
      onUpdate: 'CASCADE'
    });


    Job.hasMany(models.JobApplication,{
      as:'JobApplication',
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.JobPayment,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.Chat,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });

    Job.hasOne(models.Contract,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.JobReport,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.JobFiles,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.SelectedJobs,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });
  };
  return Job;
};