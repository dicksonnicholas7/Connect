'use strict';
module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define('Education', {
    institution_name: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    qualification: DataTypes.STRING
  }, {});
  Education.associate = function(models) {
    // associations can be defined here
    Education.belongsTo(models.User,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };
  return Education;
};