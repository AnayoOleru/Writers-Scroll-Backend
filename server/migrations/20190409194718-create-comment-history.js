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
        references: {
          model: 'Comments', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_updated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_reply: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      reply: {
        type: Sequelize.STRING,
        allowNull: true,
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
