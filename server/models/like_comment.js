module.exports = (sequelize, DataTypes) => {
  const LikeComment = sequelize.define('Like_comment', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    comment_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  LikeComment.associate = models => {
    LikeComment.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    LikeComment.belongsTo(models.Comment, {
      foreignKey: 'comment_id',
    });
  };
  return LikeComment;
};
