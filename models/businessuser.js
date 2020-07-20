'use strict';
module.exports = (sequelize, DataTypes) => {
  const BusinessUser = sequelize.define('BusinessUser', {
    businessname: DataTypes.STRING,
    service: DataTypes.STRING,
    availability: DataTypes.STRING,
    golden_paragraph: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    alpha2code: DataTypes.STRING,
    phone: DataTypes.STRING,
    picture: DataTypes.STRING,
    certificate: DataTypes.STRING
  }, {});
  BusinessUser.associate = function(models) {
    // associations can be defined here
    BusinessUser.belongsTo(models.UserAccount,{
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
      });
  };
  return BusinessUser;
};