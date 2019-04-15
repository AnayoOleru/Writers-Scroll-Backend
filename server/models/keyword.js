module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define(
    'Keyword',
    {
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
      keyword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['keyword'],
        },
      ],
    }
  );
  Keyword.associate = models =>
    Keyword.belongsTo(models.Article, {
      foreignKey: 'article_id',
      as: 'article',
    });
  return Keyword;
};
