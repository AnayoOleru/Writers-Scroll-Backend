module.exports = (sequelize, DataTypes) => {
  const Comment_reply = sequelize.define('Comment_reply', {
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
    reply: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Comment_reply.associate = models => {
    Comment_reply.hasMany(models.Comment, {
      foreignKey: 'id',
    });
  };
  return Comment_reply;
};
