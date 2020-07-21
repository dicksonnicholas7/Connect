'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.UserAccount, {
      foreignKey: 'SenderId',
      onDelete: 'CASCADE',
      as: 'Sender',
      constraints: false
    });

    Message.belongsTo(models.UserAccount, {
      foreignKey: 'ReceiverId',
      onDelete: 'CASCADE',
      as: 'Receiver',
      constraints: false
    });

  };
  return Message;
};