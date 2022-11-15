module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      account_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
