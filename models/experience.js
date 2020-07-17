'use strict';
module.exports = (sequelize, DataTypes) => {
  const Experience = sequelize.define('Experience', {
    name: DataTypes.STRING,
    years: DataTypes.STRING
  }, {});
  Experience.associate = function(models) {
    // associations can be defined here
    Experience.belongsTo(models.UserAccount,{
      foreignKey: 'UserId',
      onDelete:'CASCADE'
    });
  };
  return Experience;
};