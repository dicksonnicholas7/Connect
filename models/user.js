'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    specialization: DataTypes.STRING,
    about: DataTypes.STRING,
    mobile: {
      type: DataTypes.STRING
    },
    country: DataTypes.STRING,
    city: DataTypes.STRING,
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