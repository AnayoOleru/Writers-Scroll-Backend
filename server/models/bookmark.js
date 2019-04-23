/**
 * @swagger
 * definition:
 *  bookmark:
 *    type: object
 *    required:
 *      - id
 *      - article_id
 *      - user_id
 *    properties:
 *      id:
 *        type: string
 *        format: uuid
 *      article_id:
 *        type: string
 *        format: uuid
 *      user_d:
 *        type: string
 *        format: uuid
 */
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
      foreignKey: 'article_id',
    });
    Bookmark.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Bookmark;
};
