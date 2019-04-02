module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ratings', {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      article_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      rating_value: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: 0, max: 5 },
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
  down: queryInterface => queryInterface.dropTable('Ratings'),
};
