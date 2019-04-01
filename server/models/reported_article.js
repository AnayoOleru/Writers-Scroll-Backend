module.exports = (sequelize, DataTypes) => {
  const Reported = sequelize.define('Reported_article', {
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
    reported_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    article_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reporter_comment: {
      type: DataTypes.STRING,
    },
    reviewer_comment: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Reported.associate = models => {
    Reported.belongsTo(models.Article, {
      foreignKey: 'article_id',
    });
    Reported.belongsTo(models.User, {
      foreignKey: 'id',
    });
  };

  return Reported;
};
