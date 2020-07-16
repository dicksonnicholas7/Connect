'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentDetails = sequelize.define('PaymentDetails', {
    email: DataTypes.STRING,
    apikey: DataTypes.STRING
  }, {});
  PaymentDetails.associate = function(models) {
    PaymentDetails.belongsTo(models.UserAccount, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
      });
  };
  return PaymentDetails;
};