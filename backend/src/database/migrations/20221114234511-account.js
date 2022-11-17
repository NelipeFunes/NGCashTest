module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      balance: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      }
    
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts');
  }
};
