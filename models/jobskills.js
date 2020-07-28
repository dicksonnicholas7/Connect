'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobSkills = sequelize.define('JobSkills', {
    job_skill_name: DataTypes.STRING
  }, {});
  JobSkills.associate = function(models) {
    // associations can be defined here
    JobSkills.belongsTo(models.Job,{
      foreignKey: 'JobId',
      onDelete:'CASCADE'
    });
  }; 
  return JobSkills;
};