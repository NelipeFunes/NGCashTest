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
        type: Sequelize.DECIMAL(10,2),
      },
    
      created_at: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions');
  }
};
