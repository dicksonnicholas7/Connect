'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    name: DataTypes.STRING
  }, {});
  UserType.associate = function(models) {
    // associations can be defined here
    UserType.hasMany(models.UserAccount,{
      foreignKey: 'UserTypeId',
      onDelete: 'CASCADE'
    });
  };
  return UserType;
};