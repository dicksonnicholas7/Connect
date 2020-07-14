'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skills = sequelize.define('Skills', {
    name: DataTypes.STRING,
    details: DataTypes.STRING
  }, {});
  Skills.associate = function(models) {
    // associations can be defined here
    Skills.belongsTo(models.User,{
      foreignKey: 'SkillUserId',
      onDelete:'CASCADE'
    });

    Skills.belongsTo(models.BusinessUser,{
      foreignKey: 'SkillBusId',
      onDelete:'CASCADE'
    });
  };
  return Skills;
};