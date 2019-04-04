module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    article_id: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
  Notification.associate = models =>
    Notification.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });

  Notification.associate = models =>
    Notification.belongsTo(models.Article, {
      foreignKey: 'article_id',
      onDelete: 'CASCADE',
    });
  return Notification;
};
