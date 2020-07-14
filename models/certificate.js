'use strict';
module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    cert_name: DataTypes.STRING
  }, {});
  Certificate.associate = function(models) {
    // associations can be defined here
    Certificate.belongsTo(models.User,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };
  return Certificate;
};