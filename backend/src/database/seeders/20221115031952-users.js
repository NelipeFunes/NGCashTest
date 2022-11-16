module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'FelipeNunes',       
        password: '$2a$10$pY3Qmdl7zNXGMqbB0Mf.CeB3b5WLHs3OhMUC5f4hujXm6/4VcT2AG',
        account_id: 1
          // senha: Felipe415263
      },

      {
        username: 'User',
        password: '$2a$10$9euviNihHi0BDR49tD4T2OVGBVSR5xzFqwEDobfB4lUpHWwOLaAQa', 
        account_id: 2
          // senha: User415263
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};