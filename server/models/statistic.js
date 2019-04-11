module.exports = (sequelize, DataTypes) => {
  const Statistic = sequelize.define('Statistic', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    article_id: {
      type: DataTypes.STRING,
    },
  });
  Statistic.associate = models =>
    Statistic.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });

  Statistic.associate = models =>
    Statistic.belongsTo(models.Article, {
      foreignKey: 'article_id',
      onDelete: 'CASCADE',
    });
  return Statistic;
};
