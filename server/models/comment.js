/**
 * @swagger
 * definition:
 *  comment:
 *    type: object
 *    required:
 *      - article_id
 *      - body
 *    properties:
 *      article_id:
 *        type: string
 *        format: uuid
 *      body:
 *        type: string
 */

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
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
    article_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Comment.associate = models => {
    const { Article, User, Comment_history } = models;

    Comment.belongsTo(Article, {
      foreignKey: 'user_id',
    });
    Comment.belongsTo(User, {
      foreignKey: 'id',
    });

    Comment.hasMany(Comment_history, {
      foreignKey: 'comment_id',
      as: 'updatedComments',
    });
  };
  return Comment;
};
