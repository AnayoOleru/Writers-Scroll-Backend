module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    article_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  Bookmark.associate = models => {
    Bookmark.belongsTo(models.Article, {
      foreignKey: 'user_id',
    });
    Bookmark.belongsTo(models.User, {
      foreignKey: 'id',
    });
  };
  return Bookmark;
};
