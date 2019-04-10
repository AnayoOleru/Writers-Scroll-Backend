module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Statistics', {
      user_id: {
        type: Sequelize.UUID,
      },
      article_id: {
        type: Sequelize.UUID,
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
  down: queryInterface => queryInterface.dropTable('Statistics'),
};
