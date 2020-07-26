'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      JobId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Jobs',
          key:'id'
        }
      },
      contract_status: {
        type: Sequelize.STRING
      },
      contract_acceptance: {
        type: Sequelize.STRING
      },
      contract_note: {
        type: Sequelize.STRING
      },
      contract_freelance_review: {
        type: Sequelize.STRING
      },
      contract_client_review: {
        type: Sequelize.STRING
      },
      contract_freelance_rating: {
        type: Sequelize.INTEGER
      },
      contract_client_rating: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contracts');
  }
};