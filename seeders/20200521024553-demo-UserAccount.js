'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserAccounts', [
      {id:'32fe0cf3-d47d-452b-aae8-06d16a5fa520',  email: 'admin@amalitech.com', password: '570783d44d0cb688b7fc16884f0d2731f61dea3f270a42e84fd501f61055f439', verified:true, RoleId: 3 ,createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserAccountd', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};



