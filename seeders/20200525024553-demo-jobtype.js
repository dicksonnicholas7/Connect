'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usertypes', [
      {
        id: 1,
        name: 'business',
        createdAt:'2020-07-01 00:00:00',
        updatedAt:'2020-07-01 00:00:00'
      },{
        id: 2,
        name: 'regular',
        createdAt:'2020-07-01 00:00:00',
        updatedAt:'2020-07-01 00:00:00'
      },
    ], 
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usertypes', null, {});
  }
};
