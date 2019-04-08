module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    abstract: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    bookmark_count: {
      type: DataTypes.INTEGER,
    },
    likes_count: {
      type: DataTypes.INTEGER,
    },
    is_reported: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_draft: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Article.associate = models =>
    Article.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  return Article;
};
