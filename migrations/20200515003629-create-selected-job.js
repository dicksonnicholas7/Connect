'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SelectedJobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ClientId:{
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'UserAccounts',
          key:'id'
        }
      },
      FreelancerId:{
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'UserAccounts',
          key:'id'
        }
      },
      JobId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Jobs',
          key:'id'
        }
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
    return queryInterface.dropTable('SelectedJobs');
  }
};