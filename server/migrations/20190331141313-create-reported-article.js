module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reported_articles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      reporter_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      reported_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      article_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      reporter_comment: {
        type: Sequelize.TEXT,
      },
      reviewer_comment: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('Reported_articles'),
};
