'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skills = sequelize.define('Skills', {
    name: DataTypes.STRING,
    details: DataTypes.STRING
  }, {});
  Skills.associate = function(models) {
    // associations can be defined here
    Skills.belongsTo(models.UserAccount,{
      foreignKey: 'UserId',
      onDelete:'CASCADE'
    });
  };
  return Skills;
};