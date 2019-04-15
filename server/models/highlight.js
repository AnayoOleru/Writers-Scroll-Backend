/**
 * @swagger
 * definition:
 *  highlight:
 *    type: object
 *    required:
 *      - user_id
 *      - start_postion
 *      - end_position
 *    properties:
 *      user_id:
 *        type: string
 *        format: uuid
 *      start_postion:
 *        type: integer
 *      end_position:
 *        type: integer
 *      comment:
 *        type: string
 */

module.exports = (sequelize, DataTypes) => {
  const Highlight = sequelize.define('Highlight', {
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
    start_position: {
      type: DataTypes.INTEGER,
    },
    end_position: {
      type: DataTypes.INTEGER,
    },
    comment: {
      type: DataTypes.STRING,
    },
  });
  Highlight.associate = models => {
    Highlight.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Highlight.belongsTo(models.Article, {
      foreignKey: 'article_id',
    });
  };
  return Highlight;
};
