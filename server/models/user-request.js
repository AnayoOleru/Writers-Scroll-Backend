module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
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
    is_reviewer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_reported: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Request.associate = models =>
    Request.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  return Request;
};
