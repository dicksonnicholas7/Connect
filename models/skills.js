'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skills = sequelize.define('Skills', {
    name: DataTypes.STRING
  }, {});
  return Skills;
};