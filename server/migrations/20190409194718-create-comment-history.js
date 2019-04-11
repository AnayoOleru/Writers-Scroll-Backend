module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comment_histories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      comment_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: queryInterface => queryInterface.dropTable('Comment_histories'),
};
