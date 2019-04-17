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
 *      reply:
 *        type: string
 *  reply-comment:
 *    type: object
 *    required:
 *      - reply
 *    properties:
 *      reply:
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
    likes_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Comment.associate = models => {
    const { Article, User, Comment_history, Comment_reply } = models;

    Comment.belongsTo(Article, {
      foreignKey: 'article_id',
    });
    Comment.belongsTo(User, {
      foreignKey: 'user_id',
    });

    Comment.hasMany(Comment_history, {
      foreignKey: 'comment_id',
      onDelete: 'CASCADE',
      as: 'histories',
    });

    Comment.hasMany(Comment_reply, {
      foreignKey: 'comment_id',
      onDelete: 'CASCADE',
      as: 'replies',
    });
  };
  return Comment;
};
