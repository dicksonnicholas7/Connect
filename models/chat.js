'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    message: DataTypes.STRING
  }, {});
  Chat.associate = function(models) {
    Chat.belongsTo(models.Job, {
      foreignKey: 'JobId',
      onDelete: 'CASCADE'
    });
  };
  return Chat;
};