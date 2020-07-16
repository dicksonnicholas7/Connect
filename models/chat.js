'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    message: DataTypes.STRING
  }, {});
  Chat.associate = function(models) {
    // associations can be defined here
    Chat.belongsTo(models.UserAccount, {
      foreignKey: 'SenderId',
      onDelete: 'CASCADE'
    });

    Chat.belongsTo(models.UserAccount, {
      foreignKey: 'ReceiverId',
      onDelete: 'CASCADE'
    });

    Chat.belongsTo(models.Job, {
      foreignKey: 'JobId',
      onDelete: 'CASCADE'
    });
  };
  return Chat;
};