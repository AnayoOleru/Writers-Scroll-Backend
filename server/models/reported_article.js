/**
 * @swagger
 * definition:
 *  report:
 *    type: object
 *    required:
 *      - reporter_reason
 *      - reporter_comment
 *    properties:
 *      reporter_reason:
 *        type: string
 *      reporter_comment:
 *        type: string
 *  review:
 *    type: object
 *    required:
 *      - reviewer_comment
 *    properties:
 *      reviewer_reason:
 *        type: string
 *  status:
 *    type: object
 *    required:
 *      - status
 *      - admin_comment
 *    properties:
 *      admin_reason:
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
    reviewer_id: {
      type: DataTypes.UUID,
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
    admin_comment: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      allowNull: false,
    },
  });
  Reported.associate = models => {
    const { Article, User } = models;
    Reported.belongsTo(Article, {
      foreignKey: 'reported_article_id',
      as: 'article',
    });
    Reported.belongsTo(User, {
      foreignKey: 'reporter_id',
      foreignKey: 'reported_user_id',
      as: 'user',
    });
  };

  return Reported;
};
