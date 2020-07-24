'use strict';
module.exports = (sequelize, DataTypes) => {
  const SkillsCategory = sequelize.define('SkillsCategory', {
    name: DataTypes.STRING
  }, {});
  SkillsCategory.associate = function(models) {
    // associations can be defined here
    SkillsCategory.hasMany(models.UserSkills,{
      foreignKey: 'SkillsCatId',
      onUpdate: 'CASCADE'
    });
  };
  return SkillsCategory;
};