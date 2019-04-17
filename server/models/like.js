module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
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
  Like.associate = models => {
    Like.belongsTo(models.Article, {
      foreignKey: 'article_id',
    });
    Like.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Like;
};
