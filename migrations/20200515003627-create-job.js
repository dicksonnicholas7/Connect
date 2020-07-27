'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Jobs', {
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
      CatId:{
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        references:{
          model: 'JobCategories',
          key:'id'
        }
      },
      job_title: {
        type: Sequelize.STRING
      },
      job_details: {
        type: Sequelize.STRING
      },
      job_timeLength: {
        type: Sequelize.STRING
      },
      job_price: {
        type: Sequelize.DECIMAL(6, 2)
      },
      job_skills: {
        type: Sequelize.STRING
      },
      job_status: {
        type: Sequelize.STRING
      },
      job_jobType: {
        type: Sequelize.INTEGER
      },
      job_UserType: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Jobs');
  }
};