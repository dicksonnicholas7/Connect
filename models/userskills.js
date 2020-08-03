'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSkills = sequelize.define('UserSkills', {
    skills_name: DataTypes.STRING
  }, {});
  UserSkills.associate = function(models) {
    // associations can be defined here
    UserSkills.belongsTo(models.UserAccount,{
      foreignKey: 'UserId',
      onDelete:'CASCADE'
    });
  };
  return UserSkills;
};