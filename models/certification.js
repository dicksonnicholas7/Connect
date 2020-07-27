'use strict';
module.exports = (sequelize, DataTypes) => {
  const Certification = sequelize.define('Certification', {
    name: DataTypes.STRING,
    filename: DataTypes.STRING
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