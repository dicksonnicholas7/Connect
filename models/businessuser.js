'use strict';
module.exports = (sequelize, DataTypes) => {
  const BusinessUser = sequelize.define('BusinessUser', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    certificate: DataTypes.STRING
  }, {});
  BusinessUser.associate = function(models) {
    // associations can be defined here
    BusinessUser.belongsTo(models.UserAccount,{
        foreignKey: 'BusinessUserId',
        onDelete: 'CASCADE'
      });
  };
  return BusinessUser;
};