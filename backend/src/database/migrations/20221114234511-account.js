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
        type: Sequelize.INTEGER
      }
    
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts');
  }
};
