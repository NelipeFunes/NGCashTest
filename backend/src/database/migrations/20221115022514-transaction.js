module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: { 
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    
      debited_account_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'debited_account_id',
        references: {
          model: 'accounts',
          key: 'id'
        },
      },
    
      credited_account_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'credited_account_id',
        references: {
          model: 'accounts',
          key: 'id'
        },
      },
    
      value: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions');
  }
};
