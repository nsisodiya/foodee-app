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
          firstName: 'Narendra',
          lastName: 's',
          email: 'narendra@gmail.com',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        {
          firstName: 'Narendra 1',
          lastName: 's',
          email: 'narendra1@gmail.com',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        {
          firstName: 'Narendra S1',
          lastName: 's',
          email: 'narendras1@gmail.com',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        {
          firstName: 'Narendra S2',
          lastName: 's',
          email: 'narendras2@gmail.com',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
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
