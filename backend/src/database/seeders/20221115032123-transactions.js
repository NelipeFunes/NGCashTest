module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transactions', [
      {
       debited_account_id: 1,
       credited_account_id: 2,
       value: 100,
       created_at: '2022-11-15T19:22:17.000Z'
      },

      {
        debited_account_id: 2,
        credited_account_id: 1,
        value: 100,
        created_at: '2022-11-15T19:22:17.000Z'
       },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};