'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    jobtitle: DataTypes.STRING,
    availability: DataTypes.STRING,
    golden_paragraph: DataTypes.STRING,
    gender: DataTypes.STRING,
    alpha2code: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    phone: {
      type: DataTypes.STRING
    },
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    country_code: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.UserAccount,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
    
  };
  return User;
};