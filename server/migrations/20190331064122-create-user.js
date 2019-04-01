module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      bio: {
        type: Sequelize.TEXT,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isactivated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      imageurl: {
        type: Sequelize.STRING,
      },
      isadmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isreviewer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isreported: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      research_field: {
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
    }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
