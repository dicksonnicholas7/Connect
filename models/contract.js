'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    contract_status: DataTypes.STRING,
    contract_acceptance: DataTypes.STRING,
    contract_note: DataTypes.STRING,
    contract_freelance_review: DataTypes.STRING,
    contract_client_review: DataTypes.STRING,
    contract_freelance_rating: DataTypes.INTEGER,
    contract_client_rating: DataTypes.INTEGER
  }, {});
  Contract.associate = function(models) {
    // associations can be defined here
    Contract.belongsTo(models.Job,{
      foreignKey: 'JobId',
      onDelete: 'CASCADE'
    });
  };
  return Contract;
};