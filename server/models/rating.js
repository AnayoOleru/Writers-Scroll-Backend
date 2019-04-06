/**
 * @swagger
 * definition:
 *  rating:
 *    type: object
 *    required:
 *      - article_id
 *      - rating_value
 *    properties:
 *      article_id:
 *        type: string
 *        format: uuid
 *      rating_value:
 *        type: integer
 *        format: int64
 */

module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    article_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    rating_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: { min: 0, max: 5 },
    },
  });
  Rating.associate = models => {
    Rating.belongsTo(models.Article, {
      foreignKey: 'article_id',
    });
    Rating.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Rating;
};
