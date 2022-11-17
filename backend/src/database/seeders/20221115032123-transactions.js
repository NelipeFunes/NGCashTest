module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transactions', [
      {
       debited_account_id: 1,
       credited_account_id: 2,
       value: 100,
       created_at: '2022-11-15'
      },

      {
        debited_account_id: 2,
        credited_account_id: 1,
        value: 100,
        created_at: '2022-11-15'
       },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};