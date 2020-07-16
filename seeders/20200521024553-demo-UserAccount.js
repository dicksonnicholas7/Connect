'use strict';

const crypto = require('crypto');
let secret = "connect";

const hashPassword = (password) =>{
  return crypto.createHmac('sha256', secret)
      .update(password)
      .digest('hex');
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserAccounts', [
      {id:'32fe0cf3-d47d-452b-aae8-06d16a5fa520',  email: 'admin1@gmail.com', password: hashPassword('admin'), verified:true, RoleId: 3 ,createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'},
      {id:'56fe0cf3-d47d-492b-aae8-06d16a5fa410', email: 'admin2@gmail.com', password: hashPassword('admin'), verified:true, RoleId: 3 ,createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'}
    ], {});

    const userAccounts = await queryInterface.sequelize.query(
        `SELECT id from UserAccounts;`
    );

    const usersRows = userAccounts[0];

    return queryInterface.bulkInsert('Users', [
      {username: 'admin1', UserId: usersRows[0].id, createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'},
      {username: 'admin2', UserId: usersRows[0].id, createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserAccountd', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};

