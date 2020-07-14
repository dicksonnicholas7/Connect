'use strict';
module.exports = (sequelize, DataTypes) => {
  const TwoFactorAuth = sequelize.define('TwoFactorAuth', {
    AuthyId: DataTypes.STRING,
    mobile: DataTypes.STRING
  }, {});
  TwoFactorAuth.associate = function(models) {
    // associations can be defined here
    TwoFactorAuth.belongsTo(models.User,{
      foreignKey: 'UserId',
      onDelete:'CASCADE'
    });
  };
  return TwoFactorAuth;
};