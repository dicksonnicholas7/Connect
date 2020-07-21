'use strict';
module.exports = (sequelize, DataTypes) => {
  const Certification = sequelize.define('Certification', {
    discipline: DataTypes.STRING,
    type: DataTypes.STRING,
    year: DataTypes.STRING
  }, {});
  Certification.associate = function(models) {
    // associations can be defined here
    Certification.belongsTo(models.UserAccount,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };
  return Certification;
};