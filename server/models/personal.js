module.exports = (sequelize, DataTypes) => {
  const Personal = sequelize.define(
    'Personal',
    {
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
    },
    {}
  );
  Personal.associate = models =>
    Personal.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  return Personal;
};
