module.exports = (sequelize, DataTypes) => {
  const Draft = sequelize.define('Draft', {
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
    },
    abstract: {
      type: DataTypes.TEXT,
    },
    imageurl: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
    },
  });
  Draft.associate = models =>
    Draft.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  return Draft;
};
