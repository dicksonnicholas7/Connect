'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAccount = sequelize.define('UserAccount', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    firstTime: DataTypes.BOOLEAN,
    blocked: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
    email_hash: DataTypes.STRING
  }, {});
  UserAccount.associate = function(models) {
    // associations can be defined here

    UserAccount.belongsTo(models.Role, {
        foreignKey: 'RoleId',
        onDelete: 'SET NULL'
      });
  
      UserAccount.belongsTo(models.UserType,{
        foreignKey: 'UserTypeId',
        onDelete: 'CASCADE'
      });

    UserAccount.hasOne(models.User,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    UserAccount.hasOne(models.BusinessUser,{
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
      });

    UserAccount.hasMany(models.Job, {
      foreignKey: 'ClientId',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.JobApplication, {
      foreignKey: 'FreelanceId',
      onDelete: 'CASCADE'
    });

    UserAccount.hasOne(models.UserPaymentInfo,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.Notification, {
      foreignKey: 'ReceiverId',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.JobReport, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.JobFiles, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.Portfolio, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.Certification, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.Message, {
      foreignKey: 'SenderId',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.Message, {
      foreignKey: 'ReceiverId',
      onDelete: 'CASCADE'
    });

    UserAccount.hasOne(models.UserSkills,{
      foreignKey: 'UserId',
      onDelete:'CASCADE'
    });

    UserAccount.hasMany(models.Experience,{
      foreignKey: 'UserId',
      onDelete:'CASCADE'
    });

    UserAccount.hasOne(models.TwoFactorAuth,{
      foreignKey: 'UserId',
      onDelete:'CASCADE'
    });
  };
  return UserAccount;
};