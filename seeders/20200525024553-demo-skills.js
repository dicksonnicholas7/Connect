'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Skills', [{
        name: 'JavaScript',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'Django',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'Python',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'Java',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'Mongo DB',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'C++',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'Android',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'Figma',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'Angular',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'Adobe XD',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'MySQL',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'Bootstrap',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'CSS',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'Kotlin',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'illustrator',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
        name: 'Flutter',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Skills', null, {});
  }
};
