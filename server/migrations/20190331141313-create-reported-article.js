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
      reviewer_id: {
        type: Sequelize.UUID,
      },
      reported_user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      reported_article_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      reporter_reason: {
        type: Sequelize.STRING,
      },
      reporter_comment: {
        type: Sequelize.STRING,
      },
      reviewer_comment: {
        type: Sequelize.STRING,
      },
      admin_comment: {
        type: Sequelize.STRING,
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
