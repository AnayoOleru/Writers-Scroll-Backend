/**
 * @swagger
 * definition:
 *  reported_article:
 *    type: object
 *    required:
 *      - reported_user_id
 *      - reporter_reason
 *      - reporter_comment
 *      - reviewer_comment
 *      - status
 *    properties:
 *      reporter_id:
 *        type: string
 *        format: uuid
 *      reported_user_id:
 *        type: string
 *        format: uuid
 *      reported_article_id:
 *        type: string
 *        format: uuid
 *      reporter_reason:
 *        type: string
 *      reporter_comment:
 *        type: string
 *      status:
 *        type: string
 */
module.exports = (sequelize, DataTypes) => {
  const Reported = sequelize.define('Reported_articles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    reporter_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reported_user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reported_article_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reporter_reason: {
      type: DataTypes.STRING,
    },
    reporter_comment: {
      type: DataTypes.STRING,
    },
    reviewer_comment: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      allowNull: false,
    },
  });
  Reported.associate = models => {
    Reported.belongsTo(models.Article, {
      foreignKey: 'reported_article_id',
    });
    Reported.belongsTo(models.User, {
      foreignKey: 'reporter_id',
      foreignKey: 'reported_user_id',
    });
  };

  return Reported;
};
