'use strict';
module.exports = (sequelize, DataTypes) => {
  const BusinessUser = sequelize.define('BusinessUser', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    email: DataTypes.STRING,
    certificate: DataTypes.STRING
  }, {});
  BusinessUser.associate = function(models) {
    // associations can be defined here
    BusinessUser.hasOne(models.UserAccount,{
      foreignKey: 'BusinessId',
      onDelete: 'CASCADE'
    });
    BusinessUser.hasMany(models.Skills,{
      foreignKey: 'SkillBusId',
      onDelete:'CASCADE'
    });

    BusinessUser.hasMany(models.Portfolio, {
      foreignKey: 'BusinessPortId',
      onDelete: 'CASCADE'
    });
  };
  return BusinessUser;
};