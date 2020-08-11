'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Narendra',
          password: 's',
          email: 'narendra@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Narendra 1',
          password: 's',
          email: 'narendra1@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Narendra S1',
          password: 's',
          email: 'narendras1@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Narendra S2',
          password: 's',
          email: 'narendras2@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
