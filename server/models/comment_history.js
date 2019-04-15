module.exports = (sequelize, DataTypes) => {
  const Comment_history = sequelize.define('Comment_history', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    comment_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_updated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_reply: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reply: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Comment_history.associate = models => {
    Comment_history.hasMany(models.Comment, {
      foreignKey: 'id',
    });
  };
  return Comment_history;
};
